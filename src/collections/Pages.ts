import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
    slug: 'pages',
    fields: [
        {
            name: 'slug',
            type: 'text',
            required: true,
        },
        {
            name: 'isRoot',
            type: 'checkbox',
            label: 'Is Root Page (Home)',
        },
        {
            name: 'components',
            type: 'relationship',
            relationTo: 'components',
            hasMany: true,
            required: true,
        },
    ],
}
