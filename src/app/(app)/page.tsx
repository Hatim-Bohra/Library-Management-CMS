import React from 'react'
import { getLocalPayload } from '../../lib/payload'
import { RenderBlocks } from '../../components/RenderBlocks'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const payload = await getLocalPayload()

  // Find the page with slug 'home'
  const result = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'home',
      },
    },
  })

  const homePage = result.docs[0]

  if (!homePage) {
    return (
      <div className="container page-container" style={{ textAlign: 'center', padding: '4rem 0' }}>
        <h1 className="section-title">Welcome to the Library</h1>
        <p className="card-subtitle">
          This content is dynamic! To set up your home page:
        </p>
        <ol style={{ textAlign: 'left', display: 'inline-block', color: 'var(--muted-foreground)', marginTop: '1rem', lineHeight: '1.6' }}>
          <li>Go to the <a href="/admin" style={{ textDecoration: 'underline', color: 'var(--foreground)' }}>Admin Panel</a>.</li>
          <li>Create a new Page with the slug <strong>home</strong>.</li>
          <li>Add blocks like "Carousel" and "Book Grid" to the layout.</li>
          <li>Save and refresh this page.</li>
        </ol>
      </div>
    )
  }

  return (
    <div className="container page-container">
      <RenderBlocks blocks={homePage.layout} />
    </div>
  )
}
