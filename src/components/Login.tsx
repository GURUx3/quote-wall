import { useState, type FormEvent } from 'react'

type LoginProps = {
  onLogin: (email: string, password: string) => Promise<void>
  onRegister: (
    email: string,
    password: string,
    displayName: string,
  ) => Promise<boolean>
}

export function Login({ onLogin, onRegister }: LoginProps) {
  const [isRegistering, setIsRegistering] = useState(false)
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setMessage('')

    if (isRegistering && !displayName.trim()) {
      setError('Please enter your name.')
      return
    }

    setIsSubmitting(true)
    try {
      if (isRegistering) {
        const needsEmailConfirmation = await onRegister(
          email,
          password,
          displayName.trim(),
        )
        if (needsEmailConfirmation) {
          setMessage('Check your email to confirm your account, then log in.')
        }
      } else {
        await onLogin(email, password)
      }
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Something went wrong. Please try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  function switchMode() {
    setIsRegistering(!isRegistering)
    setDisplayName('')
    setError('')
    setMessage('')
  }

  return (
    <section className="auth-card" aria-labelledby="auth-title">
      <h2 id="auth-title">
        {isRegistering ? 'Create an account' : 'Welcome back'}
      </h2>
      <p className="muted">
        {isRegistering
          ? 'A name, an email, and you’re in.'
          : 'Log in to share a thought with the wall.'}
      </p>
      <form className="stack" onSubmit={handleSubmit}>
        {isRegistering && (
          <label>
            Name
            <input
              autoComplete="name"
              name="name"
              maxLength={80}
              onChange={(event) => setDisplayName(event.target.value)}
              placeholder="Your name"
              required
              value={displayName}
            />
          </label>
        )}
        <label>
          Email
          <input
            autoComplete="email"
            name="email"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            required
            type="email"
            value={email}
          />
        </label>
        <label>
          Password
          <input
            autoComplete={isRegistering ? 'new-password' : 'current-password'}
            name="password"
            minLength={6}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="At least 6 characters"
            required
            type="password"
            value={password}
          />
        </label>
        {error && (
          <p className="notice error" role="alert">
            {error}
          </p>
        )}
        {message && (
          <p className="notice success" role="status">
            {message}
          </p>
        )}
        <button className="auth-submit" disabled={isSubmitting} type="submit">
          {isSubmitting
            ? 'Please wait...'
            : isRegistering
              ? 'Create account'
              : 'Log in'}
        </button>
      </form>
      <p className="switch-mode">
        {isRegistering ? 'Already have an account?' : 'New to QuoteWall?'}
        {' '}
        <button className="text-button" onClick={switchMode} type="button">
          {isRegistering ? 'Log in' : 'Create an account'}
        </button>
      </p>
    </section>
  )
}
