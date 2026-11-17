import { useEffect, useState } from 'react'
import type { User } from '@supabase/supabase-js'
import { Login } from './components/Login'
import { QuoteForm } from './components/QuoteForm'
import { QuoteList, type Quote } from './components/QuoteList'
import { supabase, supabaseIsConfigured } from './lib/supabase'

export default function App() {
  const [user, setUser] = useState<User | null>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [quotesLoading, setQuotesLoading] = useState(true)
  const [feedError, setFeedError] = useState('')

  useEffect(() => {
    if (!supabase) {
      setAuthLoading(false)
      setQuotesLoading(false)
      return
    }

    const client = supabase
    client.auth.getSession().then(({ data, error }) => {
      if (error) {
        setFeedError(error.message)
      }
      setUser(data.session?.user ?? null)
      setAuthLoading(false)
    })

    const { data } = client.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => data.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!supabase) {
      return
    }

    const client = supabase
    async function loadQuotes() {
      setQuotesLoading(true)
      setFeedError('')
      const { data, error } = await client
        .from('quotes')
        .select('id, content, author_name, created_at')
        .order('created_at', { ascending: false })

      if (error) {
        setFeedError(error.message)
      } else {
        setQuotes(data ?? [])
      }
      setQuotesLoading(false)
    }

    void loadQuotes()
  }, [])

  async function handleLogin(email: string, password: string) {
    if (!supabase) {
      throw new Error('Add your Supabase settings to the .env file first.')
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      throw error
    }
  }

  async function handleRegister(
    email: string,
    password: string,
    displayName: string,
  ) {
    if (!supabase) {
      throw new Error('Add your Supabase settings to the .env file first.')
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { display_name: displayName } },
    })
    if (error) {
      throw error
    }
    return !data.session
  }

  async function handleLogout() {
    if (!supabase) {
      return
    }
    const { error } = await supabase.auth.signOut()
    if (error) {
      setFeedError(error.message)
    }
  }

  async function handlePost(content: string) {
    if (!supabase || !user) {
      throw new Error('Log in before posting a quote.')
    }

    const authorName =
      user.user_metadata.display_name?.trim() ||
      user.email?.split('@')[0] ||
      'QuoteWall member'
    const { data, error } = await supabase
      .from('quotes')
      .insert({
        content,
        user_id: user.id,
        author_name: authorName,
      })
      .select('id, content, author_name, created_at')
      .single()

    if (error) {
      throw error
    }
    setQuotes((currentQuotes) => [data, ...currentQuotes])
  }

  if (!supabaseIsConfigured) {
    return (
      <main className="page">
        <header className="site-header">
          <h1>QuoteWall</h1>
        </header>
        <p className="notice error">
          Supabase is not configured. Copy <code>.env.example</code> to{' '}
          <code>.env</code>, add your project URL and anon key, and restart Vite.
        </p>
      </main>
    )
  }

  return (
    <main className="page">
      <header className="site-header">
        <div>
          <h1>QuoteWall</h1>
        </div>
        {!authLoading && user && (
          <div className="user-actions">
            <span className="muted">
              {user.user_metadata.display_name || user.email}
            </span>
            <button className="secondary-button" onClick={handleLogout}>
              Log out
            </button>
          </div>
        )}
      </header>

      {authLoading ? (
        <p className="muted">Checking your account...</p>
      ) : user ? (
        <QuoteForm onPost={handlePost} />
      ) : (
        <Login onLogin={handleLogin} onRegister={handleRegister} />
      )}

      <section className="feed" aria-labelledby="feed-title">
        <h2 id="feed-title">Latest quotes</h2>
        {feedError && <p className="notice error" role="alert">{feedError}</p>}
        {quotesLoading ? (
          <p className="muted">Loading quotes...</p>
        ) : (
          <QuoteList quotes={quotes} />
        )}
      </section>
      <footer className="page-footer">A wall for words worth keeping.</footer>
    </main>
  )
}
