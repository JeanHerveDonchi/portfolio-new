// components/Blogs.jsx
import React, { useEffect, useState } from 'react';
import { fetchBlogPostEntries } from '../services/service';




export default function Blogs() {

    const [blogPosts, setBlogPosts] = useState([]);
    useEffect(() => {
        fetchBlogPostEntries().then(entries => {
            console.log(entries);
            setBlogPosts(entries);
        }).catch(error => {
            console.error("Error fetching projects:", error);
        })
    }, []);

    // Take only the first 2 blog posts
    const displayedBlogs = blogPosts.slice(0, 2);

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
                            <div key={blog.id} className="group cursor-pointer relative overflow-hidden rounded-lg w-full">
                                {/* Blog banner image placeholder with more height and full width on mobile */}
                                <div className="w-full h-56 bg-gray-400 flex items-center justify-center transition-all duration-300 group-hover:brightness-75 bg-center bg-cover"
                                    style={{
                                        backgroundImage: `url(${blog.coverImage?.file?.url ? `https:${blog.coverImage?.file?.url}` : 'https://via.placeholder.com/400x300'})`
                                    }}
                                >
                                    <span className="text-gray-700 text-sm bg-white/70 px-3 py-1 rounded">{blog.title}</span>
                                </div>

                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
                                <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="text-xs text-white bg-red-900 px-2 py-1 rounded">
                                        {blog.category}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

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
                        >
                            more
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}