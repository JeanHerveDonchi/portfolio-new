// components/About.jsx
import React from 'react';

export default function About() {
    return (
        <section
            id="about"
            className="py-36 px-8"
            style={{
                backgroundColor: '#18232D',
                fontFamily: 'Rethink Sans, sans-serif'
            }}
        >
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Image section - now on the left */}
                <div className="flex justify-center lg:justify-start">
                    {/* Placeholder for profile picture */}
                    <div className="w-64 h-76 bg-gray-400 rounded-lg flex items-center justify-center">
                        <img
                            src="images/profile-image.png"
                            alt="Profile"
                            className='w-full h-full object-cover rounded-lg'
                        />
                    </div>
                </div>

                {/* Text section - now on the right */}
                <div className="space-y-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">About me</h2>
                    <p className="text-white leading-relaxed" style={{ fontSize: '15px' }}>
                        As a former Network Technician Associate, I got inspired by learning Python
                        for network automation. I now focus on building secure, scalable, and
                        well-documented backend applications.
                    </p>
                </div>
            </div>
        </section>
    );
}