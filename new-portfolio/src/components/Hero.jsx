// components/Hero.jsx
import React from 'react';
import { FaLinkedin, FaGithub } from "react-icons/fa";

export default function Hero() {
    return (
        <section
            id="home"
            className="min-h-screen flex items-center px-8 pt-20"
            style={{
                backgroundColor: '#141D26',
                fontFamily: 'Rethink Sans, sans-serif'
            }}
        >
            <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <h1 className="text-2xl md:text-3xl text-white">Hi</h1>
                        <h1 className="text-4xl md:text-5xl font-semibold text-white">I'm Jean</h1>
                        <p className="text-lg md:text-xl text-white">
                            Highly Passionate
                        </p>
                        <p className="text-3xl md:text-4xl font-bold text-white">
                            Backend Developer
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 items-start">
                        <div className="flex gap-4">
                            <button
                                className="text-white px-8 py-3 transition-all duration-300 hover:bg-transparent hover:border-2"
                                style={{
                                    backgroundColor: '#E37665',
                                    fontFamily: 'Rethink Sans, sans-serif'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = 'transparent';
                                    e.target.style.border = '2px solid #E37665';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = '#E37665';
                                    e.target.style.border = 'none';
                                }}
                            >
                                Got a project?
                            </button>
                            <button
                                className="text-white px-8 py-3 transition-all duration-300"
                                style={{
                                    backgroundColor: 'transparent',
                                    border: '2px solid #E37665',
                                    fontFamily: 'Rethink Sans, sans-serif'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = '#E37665';
                                    e.target.style.border = 'none';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = 'transparent';
                                    e.target.style.border = '2px solid #E37665';
                                }}
                            >
                                My resume
                            </button>
                        </div>

                        {/* Social media icons beside buttons */}
                        <div className="flex items-center space-x-4 ml-0 sm:ml-4">
                            {/* Placeholder for LinkedIn */}
                            <div className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-colors">
                                <a
                                    href="https://www.linkedin.com/in/jean-herve-donchi-b93b5b218/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-600 transition-colors"
                                ><FaLinkedin size={20} className="text-white" />
                                </a>
                            </div>
                            {/* Placeholder for GitHub */}
                            <div className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-colors">
                                <a
                                    href="https://github.com/JeanHerveDonchi"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-600 transition-colors"
                                >
                                    <FaGithub size={20} className="text-white" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right side - can be used for additional content later */}
                <div className="hidden lg:block">
                    {/* This space can be used for hero image, illustration, etc. */}
                </div>
            </div>
        </section>
    );
}