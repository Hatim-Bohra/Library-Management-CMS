import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
    editor: lexicalEditor(),
    admin: {
        importMap: {
            baseDir: path.resolve(dirname),
        },
    },
    collections: [
        {
            slug: 'users',
            auth: true,
            access: {
                delete: () => true,
                update: () => true,
            },
            fields: [],
        },
    ],
    secret: process.env.PAYLOAD_SECRET || '',
    typescript: {
        outputFile: path.resolve(dirname, 'payload-types.ts'),
    },
    db: mongooseAdapter({
        url: process.env.DATABASE_URI || '',
    }),
    sharp,
})
