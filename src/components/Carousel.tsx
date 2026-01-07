import React from 'react'

import Link from 'next/link'

export interface CarouselItem {
    id: string
    title: string
    subtitle?: string
    imageUrl?: string | null
    link: string
}

export const Carousel = ({ title, items }: { title?: string, items: CarouselItem[] }) => {
    if (!items || items.length === 0) return null

    return (
        <div className="carousel-container section-spacing">
            {title && <h2 className="section-title">{title}</h2>}
            <div className="carousel">
                {items.map((item, index) => (
                    <Link key={index} href={item.link} className="carousel-item card-hover">
                        <div className="carousel-image-container">
                            {item.imageUrl ? (
                                <div className="image-wrapper">
                                    <img src={item.imageUrl} alt={item.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                            ) : (
                                <div className="image-placeholder">
                                    <span>No Cover</span>
                                </div>
                            )}
                        </div>
                        <div className="carousel-content">
                            <h3 className="carousel-title">{item.title}</h3>
                            {item.subtitle && <p className="carousel-subtitle">{item.subtitle}</p>}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
