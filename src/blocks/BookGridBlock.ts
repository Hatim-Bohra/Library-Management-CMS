import type { Block } from 'payload'

export const BookGridBlock: Block = {
    slug: 'bookGrid', // required
    imageURL: 'https://cdn.payloadcms.com/images/blocks/content.png',
    imageAltText: 'A grid of books',
    fields: [
        {
            name: 'title',
            type: 'text',
            defaultValue: 'All Books',
        },
        {
            name: 'limit',
            type: 'number',
            defaultValue: 12,
        }
    ],
}
