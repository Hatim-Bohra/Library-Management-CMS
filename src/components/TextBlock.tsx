import React from 'react'

export const TextBlock = ({ data }: { data: any }) => {
    if (!data) return null

    return (
        <div className="text-block">
            {data.text && <p>{data.text}</p>}
            {data.heading && <h2>{data.heading}</h2>}
            {/* Fallback for raw json just in case */}
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    )
}
