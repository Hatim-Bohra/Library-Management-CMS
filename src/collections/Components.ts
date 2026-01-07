import type { CollectionConfig } from 'payload'

export const Components: CollectionConfig = {
    slug: 'components',
    fields: [
        {
            name: 'componentType',
            type: 'select',
            options: [
                { label: 'Text Block', value: 'textBlock' },
                { label: 'Carousel', value: 'carousel' },
            ],
            required: true,
        },
        {
            name: 'data',
            type: 'json',
            required: true,
        },
    ],
}
