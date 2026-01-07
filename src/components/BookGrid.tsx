import React from 'react'
import Link from 'next/link'
import { getLocalPayload } from '../lib/payload'

export const BookGrid = async ({ title = "All Books", limit = 100 }: { title?: string, limit?: number }) => {
    const payload = await getLocalPayload()

    const books = await payload.find({
        collection: 'books',
        limit: limit,
    })

    return (
        <div className="section-spacing">
            {title && <h2 className="section-title">{title}</h2>}
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
