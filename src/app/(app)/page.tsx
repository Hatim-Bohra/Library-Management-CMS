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
  const trendingBooks = books.docs.slice(0, 5).map((book: any) => ({
    id: book.id,
    title: book.title,
    subtitle: book.author,
    imageUrl: book.cover?.url,
    link: `/books/${book.id}`
  }))

  return (
    <div>
      <h1 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Library CMS</h1>
      <p style={{ fontSize: '1.125rem', color: 'var(--muted-foreground)', marginBottom: '3rem' }}>
        Discover your next great read from our curated collection.
      </p>

      <Carousel title="Trending Now" items={trendingBooks} />

      <h2 className="section-title">All Books</h2>
      <div className="grid">
        {books.docs.map((book) => (
          <Link key={book.id} href={`/books/${book.id}`} className="card card-hover">
            <div className="card-image-wrapper">
              {book.cover?.url ? (
                <img src={book.cover.url} alt={book.title} loading="lazy" />
              ) : (
                <div className="image-placeholder" style={{ backgroundColor: 'var(--secondary)' }}>
                  <span>No Cover</span>
                </div>
              )}
            </div>
            <div className="card-content">
              <h2 className="card-title">{book.title}</h2>
              <h3 className="card-subtitle">by {book.author}</h3>
              <p className="card-body-text">
                {book.description}
              </p>
              <span className="btn">View Details</span>
            </div>
          </Link>
        ))}
        {books.docs.length === 0 && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', backgroundColor: 'var(--muted)', borderRadius: 'var(--radius)' }}>
            <p style={{ color: 'var(--muted-foreground)' }}>No books found in the collection.</p>
          </div>
        )}
      </div>
    </div>
  )
}
