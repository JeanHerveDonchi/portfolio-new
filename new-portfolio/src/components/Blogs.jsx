// components/Blogs.jsx
import React from 'react';

const blogPostsData = [
    {
        id: 1,
        title: "The Future of Microservices in Backend Development",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        bannerImage: "blog1-banner.jpg",
        category: "Science",
        publishDate: "2024-01-15"
    },
    {
        id: 2,
        title: "Building Scalable APIs: Best Practices and Patterns",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        bannerImage: "blog2-banner.jpg",
        category: "Business",
        publishDate: "2024-01-10"
    },
    {
        id: 3,
        title: "The Rise of AI in Software Testing",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        bannerImage: "blog3-banner.jpg",
        category: "Trends",
        publishDate: "2024-01-05"
    },
    {
        id: 4,
        title: "Database Optimization Techniques for High Traffic Applications",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        bannerImage: "blog4-banner.jpg",
        category: "Science",
        publishDate: "2023-12-28"
    },
    {
        id: 5,
        title: "Container Orchestration: Docker vs Kubernetes",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        bannerImage: "blog5-banner.jpg",
        category: "Trends",
        publishDate: "2023-12-20"
    }
];

export default function Blogs() {
    // Take only the first 2 blog posts
    const displayedBlogs = blogPostsData.slice(0, 2);

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
                                <div className="w-full h-56 bg-gray-400 flex items-center justify-center transition-all duration-300 group-hover:brightness-75">
                                    <span className="text-gray-700 text-sm">Blog {blog.id} Banner</span>
                                </div>
                                
                                {/* Hover overlay with "Read Post" text */}
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
                            </div>
                        ))}
                    </div>
                    
                    {/* More Button - styled like "My resume" button */}
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