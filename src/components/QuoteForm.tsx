import { useState, type FormEvent } from 'react'

type QuoteFormProps = {
  onPost: (content: string) => Promise<void>
}

export function QuoteForm({ onPost }: QuoteFormProps) {
  const [content, setContent] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmedContent = content.trim()

    if (!trimmedContent) {
      setError('A quote cannot be empty.')
      return
    }
    if (trimmedContent.length > 300) {
      setError('Quotes must be 300 characters or fewer.')
      return
    }

    setError('')
    setIsSubmitting(true)
    try {
      await onPost(trimmedContent)
      setContent('')
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Your quote could not be posted. Please try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="quote-form-card" aria-labelledby="quote-form-title">
      <h2 id="quote-form-title">Share a quote</h2>
      <form className="stack" onSubmit={handleSubmit}>
        <label htmlFor="quote-content">What would you like to share?</label>
        <textarea
          id="quote-content"
          maxLength={300}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Write a quote..."
          rows={4}
          value={content}
        />
        <div className="form-footer">
          <span className="muted">{content.length + 1}/300</span>
          <button disabled={isSubmitting} type="submit">
            {isSubmitting ? 'Posting...' : 'Post'}
          </button>
        </div>
        {error && <p className="notice error" role="alert">{error}</p>}
      </form>
    </section>
  )
}
