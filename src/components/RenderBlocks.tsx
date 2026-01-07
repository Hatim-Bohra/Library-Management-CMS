import React from 'react'
import { CarouselBlockComponent } from './CarouselBlockComponent'
import { BookGrid } from './BookGrid'

export const RenderBlocks = ({ blocks }: { blocks: any[] }) => {
    if (!blocks || !Array.isArray(blocks)) return null

    return (
        <div className="blocks-container">
            {blocks.map((block, index) => {
                const { blockType, ...blockData } = block

                switch (blockType) {
                    case 'bookGrid':
                        return <BookGrid key={index} {...blockData} />
                    case 'carousel':
                        return <CarouselBlockComponent key={index} {...blockData} />
                    default:
                        // Silently ignore unknown blocks or show a dev warning
                        return process.env.NODE_ENV === 'development' ? <div key={index}>Unknown block: {blockType}</div> : null
                }
            })}
        </div>
    )
}
