import { PayloadHandler } from 'payload'

export const getLibraryStats: PayloadHandler = async (req): Promise<Response> => {
    const { payload } = req

    const books = await payload.count({
        collection: 'books',
    })

    return Response.json({
        totalBooks: books.totalDocs,
        timestamp: new Date().toISOString(),
    })
}
