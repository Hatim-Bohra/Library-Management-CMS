import type { CollectionConfig } from 'payload'

export const Books: CollectionConfig = {
    slug: 'books',
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'author',
            type: 'text',
        },
        {
            name: 'description',
            type: 'textarea',
        },
        {
            name: 'cover',
            type: 'upload',
            relationTo: 'media',
            required: false,
        },
    ],
}
