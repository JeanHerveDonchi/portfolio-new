import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {

    return (
        <nav className="w-full flex items-center justify-between px-6 py-4">
            <div className="navbar-brand">
                <a href="#" className="text-xl font-bold">My Portfolio</a>
            </div>
            <div className="flex space-x-6">
                <a href="#home" className="hover:text-blue-600">Home</a>
                <a href="#about" className="hover:text-blue-600">About</a>
                <a href="#projects" className="hover:text-blue-600">Projects</a>
                <Link to="/blog" className="hover:text-blue-600">Blog</Link>
                <a href="#contact" className="hover:text-blue-600">Contact</a>
            </div>
        </nav>
    );
}

