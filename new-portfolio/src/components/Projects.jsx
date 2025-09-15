// components/Projects.jsx
import React, { useEffect, useState } from 'react';
import { fetchProjectEntries, fetchProjectStackItems } from '../services/service.js';

const filterOptions = ['All', 'Games', 'Collaborative', 'Personal'];

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [activeFilter, setActiveFilter] = useState('All');
    const [projectStackItems, setProjectStackItems] = useState([]);
    const [activeProjectId, setActiveProjectId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchProjectEntries().then(entries => {
            setProjects(entries);
        }).catch(error => {
            console.error("Error fetching projects:", error);
        })
    }, []);

    useEffect(() => {
        if (!activeProjectId) return;

        fetchProjectStackItems(activeProjectId)
            .then(setProjectStackItems).catch((err) => {
                console.error("Error fetching stack items:", err);
                setProjectStackItems([]);
            });
    }, [activeProjectId]) // runs everytime activeProjectId changes

    const filteredProjects = activeFilter === 'All'
        ? projects
        : projects.filter(project => project.categories.includes(activeFilter));
    return (
        <section
            id="projects"
            className="py-16 px-8"
            style={{
                backgroundColor: '#101F28',
                fontFamily: 'Rethink Sans, sans-serif'
            }}
        >
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">My Projects</h2>

                {/* Filter Bar - Joined with opacity background */}
                <div className="flex justify-center mb-8 px-4">
                    <div
                        className="flex flex-col sm:flex-row rounded-3xl sm:rounded-full p-2 w-full max-w-xs sm:w-auto sm:max-w-none gap-2 sm:gap-0 sm:p-1"
                        style={{
                            backgroundColor: 'rgba(227, 118, 101, 0.33)' // E37665 with 33% opacity
                        }}
                    >
                        {filterOptions.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className="w-full sm:w-auto px-4 py-3 sm:px-6 sm:py-2 rounded-full transition-all duration-300 text-white text-sm font-medium"
                                style={{
                                    backgroundColor: activeFilter === filter ? '#E37665' : 'transparent',
                                    fontFamily: 'Rethink Sans, sans-serif'
                                }}
                                onMouseEnter={(e) => {
                                    if (activeFilter !== filter) {
                                        e.target.style.backgroundColor = '#E37665';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (activeFilter !== filter) {
                                        e.target.style.backgroundColor = 'transparent';
                                    }
                                }}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                <style jsx>{`
                    @media (max-width: 640px) {
                        .filter-bar-responsive {
                        }
                    }
                `}</style>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project) => (
                        <div
                            key={project.id}
                            className="group cursor-pointer relative overflow-hidden rounded-lg"
                        >
                            {/* Banner */}
                            <div
                                className="w-full h-64 bg-gray-400 flex items-center justify-center transition-all duration-300 group-hover:brightness-75 bg-center bg-cover"
                                style={{
                                    backgroundImage: `url(${project.banner?.file?.url ? `https:${project.banner.file.url}` : 'https://via.placeholder.com/400x300'})`
                                }}
                            >
                                <span className="text-gray-700 text-sm bg-white/70 px-3 py-1 rounded">
                                    {project.projectName}
                                </span>
                            </div>

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center justify-around w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <h3
                                    className="text-white font-semibold text-center px-4"
                                    style={{ fontSize: '20px', fontFamily: 'Rethink Sans, sans-serif' }}
                                >
                                    {project.projectDescription}
                                </h3>

                                <div className="flex flex-row gap-3">
                                    {project.links.map((link) => (
                                        <a
                                            key={link.sys.id}
                                            className="flex items-center gap-2 text-white text-sm px-3 py-1 rounded transition-colors"
                                            style={{ backgroundColor: link.fields?.linkBgcolor }}
                                            onMouseEnter={(e) =>
                                            (e.currentTarget.style.backgroundColor =
                                                link.fields?.linkBgColorHover)
                                            }
                                            onMouseLeave={(e) =>
                                            (e.currentTarget.style.backgroundColor =
                                                link.fields?.linkBgcolor)
                                            }
                                            href={link.fields?.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <img
                                                src={`https:${link.fields.logo?.fields?.file?.url}`}
                                                alt={link.fields.logo?.fields?.title || link.fields?.name}
                                                className="w-5 h-5"
                                            />
                                            <span>{link.fields?.tag}</span>
                                        </a>
                                    ))}

                                    {/* Stack button */}
                                    <button
                                        className="flex items-center gap-2 text-white text-sm px-3 py-1 rounded transition-colors"
                                        style={{ backgroundColor: "#e37665b3" }}
                                        onMouseEnter={(e) =>
                                        (e.currentTarget.style.backgroundColor =
                                            "#e37665")
                                        }
                                        onMouseLeave={(e) =>
                                        (e.currentTarget.style.backgroundColor =
                                            "#e37665b3")
                                        }
                                        onClick={() => {
                                            setActiveProjectId(project.id);
                                            setIsModalOpen(true);
                                        }}
                                    >
                                        Stack
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
                    onClick={() => setIsModalOpen(false)} // close when clicking backdrop
                >
                    <div
                        className="bg-[#18232D] p-6 rounded-xl shadow-lg w-96 relative"
                        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal
                    >
                        {/* Close Button */}
                        <button
                            className="absolute top-3 right-3 text-gray-400 hover:text-white"
                            onClick={() => setIsModalOpen(false)}
                        >
                            ❌
                        </button>

                        <h3 className="text-xl font-bold text-white mb-4">Project Stack</h3>
                        <div className="space-y-3">
                            {projectStackItems.length > 0 ? (
                                projectStackItems.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3 text-white">
                                        {item.logo && (
                                            <img
                                                src={item.logo}
                                                alt={item.title}
                                                className="w-6 h-6 object-contain"
                                            />
                                        )}
                                        <span>{item.title}</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-400">No stack items found.</p>
                            )}
                        </div>
                    </div>
                </div>
            )}


        </section>
    );
}