import type { Block } from 'payload'

export const CarouselBlock: Block = {
    slug: 'carousel', // required
    fields: [
        {
            name: 'title',
            type: 'text',
            defaultValue: 'Trending Now',
        },
        {
            name: 'type',
            type: 'select',
            options: [
                { label: 'Trending Books (Auto)', value: 'trending' },
                // Future: { label: 'Manual Selection', value: 'manual' }
            ],
            defaultValue: 'trending',
        }
    ],
}
