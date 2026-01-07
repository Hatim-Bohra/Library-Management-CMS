import React from 'react'
import Link from 'next/link'
import { getLocalPayload } from '../../lib/payload'
import { Carousel } from '../../components/Carousel'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const payload = await getLocalPayload()

  const books = await payload.find({
    collection: 'books',
    limit: 100,
  })

  // Simulate "Trending" by taking the first 5 books (or random if we had more logic)
  const trendingBooks = books.docs.slice(0, 5)

  return (
    <div>
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem', fontWeight: 'bold' }}>Library CMS</h1>

      <Carousel books={trendingBooks} />

      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', marginTop: '3rem', fontWeight: 'bold' }}>All Books</h2>
      <div className="grid">
        {books.docs.map((book) => (
          <div key={book.id} className="card">
            {book.cover?.url && (
              <div style={{ height: '200px', background: `url(${book.cover.url}) center/cover no-repeat`, borderRadius: '4px 4px 0 0', marginBottom: '1rem' }} />
            )}
            <div className="card-body">
              <h2 className="card-title">{book.title}</h2>
              <h3 className="card-subtitle">by {book.author}</h3>
              <p style={{ marginTop: '0.5rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {book.description}
              </p>
            </div>
            <Link href={`/books/${book.id}`} className="btn">
              View Details
            </Link>
          </div>
        ))}
        {books.docs.length === 0 && (
          <p className="card-subtitle">No books found. Add some in the Admin panel!</p>
        )}
      </div>
    </div>
  )
}
