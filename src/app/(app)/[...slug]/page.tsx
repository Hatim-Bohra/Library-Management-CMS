import React from 'react'
import { notFound } from 'next/navigation'
import { getLocalPayload } from '../../../lib/payload'
import { RenderBlocks } from '../../../components/RenderBlocks'

export const dynamic = 'force-dynamic'

interface PageProps {
    params: Promise<{
        slug: string[]
    }>
}

export default async function Page({ params }: PageProps) {
    const { slug: slugArray } = await params
    const slug = slugArray.join('/')
    let payload
    try {
        payload = await getLocalPayload()
    } catch (error) {
        console.error('Failed to connect to Payload:', error)
        return (
            <div className="page-container error">
                <h1>Database Connection Error</h1>
                <p>Could not connect to MongoDB. Please check your database connection.</p>
            </div>
        )
    }

    const result = await payload.find({
        collection: 'pages',
        where: {
            slug: {
                equals: slug,
            },
        },
        limit: 1,
        depth: 2, // Ensure we get components populated
    })

    if (!result.docs || result.docs.length === 0) {
        return notFound()
    }

    const page = result.docs[0]

    return (
        <div className="page-container">
            {/* <h1>{page.slug}</h1> Optional: remove title if components handle it */}
            <RenderBlocks components={page.components as any[]} />
        </div>
    )
}
