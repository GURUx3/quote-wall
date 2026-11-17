export type Quote = {
  id: string
  content: string
  author_name: string
  created_at: string
}

type QuoteListProps = {
  quotes: Quote[]
}

export function QuoteList({ quotes }: QuoteListProps) {
  if (quotes.length === 0) {
    return <p className="empty-state">No quotes yet. Be the first to share one.</p>
  }

  return (
    <div className="quote-list">
      {quotes.map((quote) => (
        <article className="quote-card" key={quote.id}>
          <blockquote>{quote.content}</blockquote>
          <footer>
            <span>{quote.author_name}</span>
            <time dateTime={quote.created_at}>
              {new Date().toLocaleDateString()}
            </time>
          </footer>
        </article>
      ))}
    </div>
  )
}
