import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getLocalPayload } from '../../../../lib/payload'

export const dynamic = 'force-dynamic'

interface PageProps {
    params: Promise<{
        id: string
    }>
}

export default async function BookDetails({ params }: PageProps) {
    const { id } = await params
    const payload = await getLocalPayload()

    let book
    try {
        book = await payload.findByID({
            collection: 'books',
            id,
        })
    } catch (error) {
        return notFound()
    }

    if (!book) {
        return notFound()
    }

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <Link href="/" style={{
                display: 'inline-flex',
                alignItems: 'center',
                marginBottom: '2rem',
                color: 'var(--muted-foreground)',
                fontWeight: 500,
                fontSize: '0.875rem'
            }}>
                &larr; Back to Library
            </Link>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '3rem', alignItems: 'start' }}>
                {/* Cover Column */}
                <div style={{
                    position: 'sticky',
                    top: '6rem',
                    borderRadius: 'var(--radius)',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow)',
                    backgroundColor: 'var(--card)',
                    aspectRatio: '2/3'
                }}>
                    {book.cover?.url ? (
                        <img
                            src={book.cover.url}
                            alt={book.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    ) : (
                        <div style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--muted-foreground)',
                            backgroundColor: 'var(--secondary)'
                        }}>
                            No Cover
                        </div>
                    )}
                </div>

                {/* Details Column */}
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
                        {book.title}
                    </h1>
                    <h2 style={{ fontSize: '1.25rem', color: 'var(--muted-foreground)', marginBottom: '2rem', fontWeight: 500 }}>
                        by <span style={{ color: 'var(--foreground)' }}>{book.author}</span>
                    </h2>

                    <div style={{ height: '1px', background: 'var(--border)', marginBottom: '2rem' }} />

                    <div style={{ lineHeight: '1.8', fontSize: '1.05rem', color: 'var(--card-foreground)' }}>
                        <h3 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--muted-foreground)', marginBottom: '1rem', fontWeight: 600 }}>
                            About this book
                        </h3>
                        {book.description?.split('\n').map((paragraph: string, index: number) => (
                            <p key={index} style={{ marginBottom: '1.5rem' }}>
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
