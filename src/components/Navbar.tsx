import React from 'react'
import Link from 'next/link'

export const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="container navbar-container">
                <Link href="/" className="navbar-logo">
                    Library CMS
                </Link>
                <div className="navbar-links">
                    <Link href="/" className="nav-link">
                        Home
                    </Link>
                    <Link href="/admin" className="nav-link">
                        Admin
                    </Link>
                </div>
            </div>
        </nav>
    )
}
