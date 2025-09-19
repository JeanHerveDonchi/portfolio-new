// components/Skills.jsx
import React from 'react';
import { DiExtjs } from "react-icons/di";
import { GrServices } from "react-icons/gr";
import { FaGitAlt } from "react-icons/fa";
import { DiChrome } from "react-icons/di";
import { FaDatabase } from "react-icons/fa6";
import { GrTest } from "react-icons/gr";
import { motion } from "motion/react"



const skillsData = [
    {
        title: "RESTful APIs",
        description: "Crafting APIs that empower frontends and scale with your business",
        icon: DiExtjs
    },
    {
        title: "Micro Services",
        description: "I build event-driven microservices that stay decoupled and scale independently",
        icon: GrServices
    },
    {
        title: "GIT",
        description: "I use git regularly in my personal and professional works",
        icon: FaGitAlt
    },
    {
        title: "Web Frameworks",
        description: "I use frameworks like React, Next.js, Express, Spring Boot, ... to build fullstack applications",
        icon: DiChrome
    },
    {
        title: "SQL Databases",
        description: "I regularly use structured databases and tools like SSMS, Oracle SQL, POSTGRESQL and others",
        icon: FaDatabase
    },
    {
        title: "Testing",
        description: "I write unit tests using Jest, xUnit.net, NUnit and MSTest",
        icon: GrTest
    }
];

export default function Skills() {
    return (
        <section
            id="skills"
            className="py-32 px-8"
            style={{
                backgroundColor: '#141D26',
                fontFamily: 'Rethink Sans, sans-serif'
            }}
        >
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white py-5">My Skills</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skillsData.map((skill, index) => (
                        <motion.div
                            key={skill}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            >
                            <div key={index} className="rounded-lg transition hover:shadow-xl shadow-md bg-gray-800 text-white p-6 rounded-lg space-y-4 flex flex-col justify-center items-center text-center h-54">
                                {/* Skill icon from data */}
                                <skill.icon size={40} className="text-white" />
                                <h3 className="font-semibold text-white" style={{ fontSize: '18px' }}>
                                    {skill.title}
                                </h3>
                                <p className="text-gray-300" style={{ fontSize: '13px' }}>
                                    {skill.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}