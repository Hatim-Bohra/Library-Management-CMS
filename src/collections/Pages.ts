import type { CollectionConfig } from 'payload'
import { BookGridBlock } from '../blocks/BookGridBlock'
import { CarouselBlock } from '../blocks/CarouselBlock'

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
            name: 'layout',
            type: 'blocks',
            blocks: [
                CarouselBlock,
                BookGridBlock,
            ],
            required: true,
        },
    ],
}
