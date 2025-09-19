// components/About.jsx
import React from 'react';
import { motion } from "motion/react"

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
            <motion.div
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}>
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Image section - now on the left */}
                    <div className="w-full flex justify-center">
                        <div className="relative w-64 h-76">
                            {/* Top-right accent square */}
                            <div className="absolute -top-[10%] -right-[10%] w-[30%] h-[30%] bg-[#E37665] rounded-tr-[40px]"></div>

                            {/* Bottom-left accent square */}
                            <div className="absolute -bottom-[10%] -left-[10%] w-[30%] h-[30%] bg-[#E37665] rounded-bl-[40px]"></div>

                            {/* Profile Image Container */}
                            <div className="w-full h-full bg-gray-400 rounded-[40px] overflow-hidden shadow-2xl shadow-black/30 relative z-10">
                                <img
                                    src="images/profile-image.png"
                                    alt="Profile"
                                    className="w-full h-full object-cover rounded-[40px]"
                                />

                            </div>
                        </div>
                    </div>
                    {/* Text section - now on the right */}
                    <div className="space-y-6">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">About me</h2>
                        <p className="text-white leading-relaxed" style={{ fontSize: '15px' }}>
                            I contribute to building secure, scalable, and well-documented full-stack applications.
                            My focus is on creating digital solutions that are user-friendly,
                            reliable, and meaningful, while continuously
                            learning and growing as a developer.
                        </p>
                    </div>
                </div>
            </motion.div>

        </section>
    );
}