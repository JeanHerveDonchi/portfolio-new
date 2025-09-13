import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { fetchBlogPostDetailsEntries } from "../services/service";
import BlogPost from "../components/BlogPost";


function BlogDetails() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    const navigate = useNavigate();

    const handleShare = () => {
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    useEffect(() => {
        const fetchBlogDetails = async () => {
            try {
                const blogDetails = await fetchBlogPostDetailsEntries(id);
                setTimeout(() => {
                    setBlog(blogDetails);
                    setLoading(false);
                }, 1000);
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        }
        fetchBlogDetails();
    }, [id]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-gray-50 pt-20">
                    <div className="max-w-4xl mx-auto px-4 py-12">
                        <div className="animate-pulse">
                            <div className="h-8 bg-gray-300 rounded-md mb-4"></div>
                            <div className="h-64 bg-gray-300 rounded-lg mb-6"></div>
                            <div className="space-y-3">
                                <div className="h-4 bg-gray-300 rounded"></div>
                                <div className="h-4 bg-gray-300 rounded"></div>
                                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    if (!blog) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-gray-50 pt-20">
                    <div className="max-w-4xl mx-auto px-4 py-12 text-center">
                        <h1 className="text-2xl font-bold text-gray-800 mb-4">Blog Not Found</h1>
                        <p className="text-gray-600">The blog post you're looking for doesn't exist.</p>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />

            {/* Main Content Container with top padding to avoid navbar overlap */}
            <div className="min-h-screen bg-gray-50">
                {/* Hero Section with Cover Image */}
                <div className="relative h-96 overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-gray-400"
                        style={{
                            backgroundImage: `url(${blog.coverImage?.fields?.file?.url ? `https:${blog.coverImage.fields.file.url}` : 'https://via.placeholder.com/1200x600/4F46E5/ffffff?text=Blog+Cover'})`
                        }}
                    >
                        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-6 left-6">
                        <span className="inline-block bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                            {blog.category}
                        </span>
                    </div>
                </div>

                {/* Content Section */}
                <div className="max-w-4xl mx-auto px-4 py-12 pt-20">
                    {/* Article Header */}
                    <div className="bg-white rounded-xl shadow-lg p-8 -mt-24 relative z-10 mb-8">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                            {blog.title}
                        </h1>

                        {/* Meta Information */}
                        <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-6 border-b border-gray-200">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span className="text-sm">
                                    <strong>Published:</strong> {formatDate(blog.createdAt)}
                                </span>
                            </div>

                            {blog.updatedAt !== blog.createdAt && (
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    <span className="text-sm">
                                        <strong>Updated:</strong> {formatDate(blog.updatedAt)}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Article Body */}
                        <BlogPost body={blog.body} />
                    </div>

                    {/* Navigation/Actions */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                            <button
                                onClick={() => navigate("/")}
                                className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back to Blogs
                            </button>

                            <div className="flex gap-3 items-center">
                                <button
                                    onClick={handleShare}
                                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                                        />
                                    </svg>
                                    {copied ? "Copied!" : "Share"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default BlogDetails;