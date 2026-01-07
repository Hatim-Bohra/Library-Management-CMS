import React from 'react'
import { TextBlock } from './TextBlock'
import { Carousel } from './Carousel'

export const RenderBlocks = ({ components }: { components: any[] }) => {
    if (!components || !Array.isArray(components)) return null

    return (
        <div className="blocks-container">
            {components.map((block, index) => {
                // Handle relationship expansion: block might be an object with 'value' or just the id depending on depth
                // But usually in Pages.ts we define 'components' as a relationship. 
                // Payload API returns relationship objects.
                // The structure depends on how we fetch it. Assuming depth > 0.

                const componentData = block.value || block

                if (!componentData) return null

                const { componentType, data } = componentData

                switch (componentType) {
                    case 'textBlock':
                        return <TextBlock key={index} data={data} />
                    case 'carousel':
                        return <Carousel key={index} data={data} />
                    default:
                        return <div key={index}>Unknown component type: {componentType}</div>
                }
            })}
        </div>
    )
}
