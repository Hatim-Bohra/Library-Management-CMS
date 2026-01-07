import React from 'react'

import Link from 'next/link'

export const Carousel = ({ books }: { books: any[] }) => {
    if (!books || books.length === 0) return null

    return (
        <div className="carousel-container" style={{ margin: '2rem 0' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>Trending Now</h2>
            <div className="carousel" style={{ display: 'flex', overflowX: 'auto', gap: '1.5rem', paddingBottom: '1rem' }}>
                {books.map((book: any, index: number) => (
                    <div key={index} className="carousel-item" style={{ minWidth: '220px', width: '220px', flexShrink: 0 }}>
                        <Link href={`/books/${book.id}`}>
                            <div style={{
                                height: '300px',
                                background: book.cover?.url ? `url(${book.cover.url}) center/cover no-repeat` : '#f0f0f0',
                                borderRadius: '8px',
                                marginBottom: '0.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {!book.cover && <span style={{ color: '#999' }}>No Cover</span>}
                            </div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: '600', margin: 0 }}>{book.title}</h3>
                            <p style={{ color: '#666', fontSize: '0.9rem', margin: 0 }}>{book.author}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
