// components/Navbar.jsx (With Mobile Responsiveness)
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const [activeSection, setActiveSection] = useState('home');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { href: '/#home', label: 'Home', id: 'home' },
        { href: '/#about', label: 'About', id: 'about' },
        { href: '/#projects', label: 'Projects', id: 'projects' },
        { href: '/#blog', label: 'Blog', id: 'blog' },
        { href: '/#contact', label: 'Contact', id: 'contact' }
    ];

    const handleNavClick = (sectionId) => {
        setActiveSection(sectionId);
        setIsMobileMenuOpen(false); // Close mobile menu when item is clicked

        if (window.location.pathname === '/') {
            const element = document.getElementById(sectionId);
            if (element) {
                //scroll smoothly to section
                element.scrollIntoView({ behavior: "smooth" });
            }
        } else {
            //navigate to home
            window.location.href = `/#${sectionId}`;
        }
    };

    const getNavItemStyle = (isActive) => ({
        backgroundColor: isActive ? '#E37665' : 'transparent'
    });

    const handleMouseEnter = (e, isActive) => {
        if (!isActive) {
            e.target.style.backgroundColor = '#E37665';
        }
    };

    const handleMouseLeave = (e, isActive) => {
        if (!isActive) {
            e.target.style.backgroundColor = 'transparent';
        }
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="w-full flex items-center justify-between px-6 py-4 fixed top-0 z-50 shadow-sm"
            style={{ backgroundColor: '#101F28', fontFamily: 'Rethink Sans, sans-serif', fontWeight: '600' }}>

            {/* Brand Name */}
            <div className="navbar-brand">
                <Link
                    key={navItems[0].id}
                    to={navItems[0].href}
                    className="text-xl font-bold text-white">
                    Jean-Herve Donchi
                </Link> 
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
                {navItems.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                        <Link
                            key={item.id}
                            to={`${item.href}`}
                            onClick={() => handleNavClick(item.id)}
                            className="text-white px-4 py-2 rounded-full transition-all duration-300"
                            style={getNavItemStyle(isActive)}
                            onMouseEnter={(e) => handleMouseEnter(e, isActive)}
                            onMouseLeave={(e) => handleMouseLeave(e, isActive)}
                        >
                            {item.label}
                        </Link>
                    );
                })}
            </div>

            {/* Mobile Hamburger Button */}
            <div className="md:hidden">
                <button
                    onClick={toggleMobileMenu}
                    className="p-2 rounded"
                    style={{ backgroundColor: '#14191D' }}
                >
                    <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1">
                        <div className="w-5 h-0.5 bg-white transition-all duration-300"></div>
                        <div className="w-5 h-0.5 bg-white transition-all duration-300"></div>
                        <div className="w-5 h-0.5 bg-white transition-all duration-300"></div>
                    </div>
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div
                    className="absolute top-full left-0 w-full md:hidden"
                    style={{ backgroundColor: '#101F28' }}
                >
                    <div className="flex flex-col space-y-2 px-6 py-4">
                        {navItems.map((item) => {
                            const isActive = activeSection === item.id;
                            return (
                                <Link
                                    key={item.id}
                                    to={`${item.href}`}
                                    onClick={() => handleNavClick(item.id)}
                                    className="text-white px-4 py-3 rounded-full transition-all duration-300"
                                    style={getNavItemStyle(isActive)}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}
        </nav>
    );
}