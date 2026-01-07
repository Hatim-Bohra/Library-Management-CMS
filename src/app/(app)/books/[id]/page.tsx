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
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <Link href="/" className="btn" style={{ marginBottom: '2rem', display: 'inline-block' }}>
                &larr; Back to Home
            </Link>

            <div className="card">
                {book.cover?.url && (
                    <div style={{
                        height: '400px',
                        background: `url(${book.cover.url}) center/contain no-repeat`,
                        backgroundColor: '#f9f9f9',
                        borderRadius: '8px',
                        marginBottom: '2rem'
                    }} />
                )}
                <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{book.title}</h1>
                <h2 style={{ fontSize: '1.5rem', color: '#666', marginBottom: '2rem' }}>by {book.author}</h2>

                <div style={{ lineHeight: '1.8', fontSize: '1.1rem' }}>
                    {book.description?.split('\n').map((paragraph: string, index: number) => (
                        <p key={index} style={{ marginBottom: '1rem' }}>
                            {paragraph}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    )
}
