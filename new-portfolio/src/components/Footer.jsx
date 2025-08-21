import React from 'react';
import { FaLinkedin, FaGithub } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="text-white py-24  px-6" style={{
            backgroundColor: '#14191D',
        }}>
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-center items-center space-x-6 mb-6">
                    {/* Placeholder for GitHub logo */}
                    <a
                        href="https://github.com/JeanHerveDonchi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-600 transition-colors"
                    >
                        <FaGithub size={20} className="text-white" />
                    </a>
                    {/* Placeholder for LinkedIn logo */}
                    <a
                        href="https://www.linkedin.com/in/jean-herve-donchi-b93b5b218/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-600 transition-colors"
                    ><FaLinkedin size={20} className="text-white" />
                    </a>
                </div>

                <div className="text-center text-white" style={{ fontSize: '14px' }}>
                    <p>Copyright 2025 © Jean Herve Donchi</p>
                </div>
            </div>
        </footer>
    );
}