import React, { useEffect, useState } from 'react';
import { fetchBlogPostEntries } from '../services/service';
import { useNavigate } from 'react-router-dom';
import { motion } from "motion/react"


export default function Blogs() {
    const [visibleCount, setVisibleCount] = useState(2);
    const [allShown, setAllShown] = useState(false);
    const [blogPosts, setBlogPosts] = useState([]);
    const [activeBlogId, setActiveBlogId] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchBlogPostEntries().then(entries => {
            setBlogPosts(entries);
        }).catch(error => {
            console.error("Error fetching projects:", error);
        })
    }, []);

    // Detect screen size
    useEffect(() => {
        const checkScreen = () => setIsMobile(window.innerWidth < 768);
        checkScreen();
        window.addEventListener("resize", checkScreen);
        return () => window.removeEventListener("resize", checkScreen);
    }, []);

    // Sort and slice blogs
    const displayedBlogs = blogPosts
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        .slice(0, visibleCount);

    const handleLoadMore = () => {
        if (visibleCount >= blogPosts.length) {
            setAllShown(true);
        } else {
            setVisibleCount(prev => prev * 2);
        }
    }

    return (
        <section
            id="blog"
            className="py-12 px-8"
            style={{
                backgroundColor: '#18232D',
                fontFamily: 'Rethink Sans, sans-serif'
            }}
        >
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Recent blogs</h2>
                    <p className="text-white" style={{ fontSize: '13px' }}>
                        Science, Business, Trends <br />
                        Here are some recent blogs I have written
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                    {/* Blog Cards */}
                    <div className="w-full lg:flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {displayedBlogs.map((blog) => (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: true }}
                            >
                                <div
                                    key={blog.id}
                                    className="group cursor-pointer relative overflow-hidden rounded-lg w-full"
                                    onClick={(e) => {
                                        if (isMobile) {
                                            if (activeBlogId !== blog.id) {
                                                e.preventDefault();
                                                setActiveBlogId(blog.id); // first tap → show overlay
                                            } else {
                                                navigate(`/blog/${blog.id}`); // second tap → go to post
                                            }
                                        }
                                    }}
                                >
                                    {/* Blog banner image */}
                                    <div
                                        className="w-full h-56 bg-gray-400 flex items-center justify-center transition-all duration-300 group-hover:brightness-75 bg-center bg-cover"
                                        style={{
                                            backgroundImage: `url(${blog.coverImage?.file?.url ? `https:${blog.coverImage?.file?.url}` : 'https://via.placeholder.com/400x300'})`
                                        }}
                                    >
                                        <span className="text-gray-700 text-sm bg-white/70 px-3 py-1 rounded">
                                            {blog.title}
                                        </span>
                                    </div>

                                    {/* Overlay */}
                                    <div
                                        className={`
                                        absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center 
                                        transition-opacity duration-300
                                        ${isMobile
                                                ? activeBlogId === blog.id ? "opacity-100" : "opacity-0"
                                                : "opacity-0 group-hover:opacity-100"}
                                    `}
                                    >
                                        <span
                                            className="text-white font-medium"
                                            style={{
                                                fontSize: '16px',
                                                fontFamily: 'Rethink Sans, sans-serif'
                                            }}
                                        >
                                            Read Post
                                        </span>
                                    </div>

                                    {/* Category label */}
                                    <div
                                        className={`
                                        absolute bottom-2 left-2 transition-opacity duration-300
                                        ${isMobile
                                                ? activeBlogId === blog.id ? "opacity-100" : "opacity-0"
                                                : "opacity-0 group-hover:opacity-100"}
                                    `}
                                    >
                                        <span className="text-xs text-white bg-red-900 px-2 py-1 rounded">
                                            {blog.category}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Load more button */}
                    <div className="lg:ml-6">
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
                            onClick={handleLoadMore}
                        >
                            more
                        </button>
                        {allShown && (
                            <p className="text-gray-300 text-sm mt-3 italic">
                                You’re all caught up!
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
