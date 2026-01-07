import type { CollectionConfig } from 'payload'

export const BlogPosts: CollectionConfig = {
    slug: 'blog-posts',
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'content',
            type: 'richText',
        },
        {
            name: 'publishedDate',
            type: 'date',
        },
    ],
}
