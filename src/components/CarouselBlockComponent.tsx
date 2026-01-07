import React from 'react'
import { getLocalPayload } from '../lib/payload'
import { Carousel } from './Carousel'

export const CarouselBlockComponent = async ({ title, type }: { title?: string, type?: string }) => {
    const payload = await getLocalPayload()

    // Default to trending/latest for now
    const books = await payload.find({
        collection: 'books',
        limit: 5,
        sort: '-createdAt'
    })

    const trendingBooks = books.docs.map((book: any) => ({
        id: book.id,
        title: book.title,
        subtitle: book.author,
        imageUrl: book.cover?.url,
        link: `/books/${book.id}`
    }))

    return <Carousel title={title} items={trendingBooks} />
}
