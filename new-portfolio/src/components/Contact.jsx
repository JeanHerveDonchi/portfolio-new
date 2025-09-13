// components/Contact.jsx
import React, { useState } from 'react';
import { useEmail } from '../hooks/useEmail';

export default function Contact() {

    const { send, isSending, success, error } = useEmail();

    const [formData, setFormData] = useState({
        from_name: "",
        reply_to: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        send(formData).then(() => {
            setFormData({ from_name: "", reply_to: "", message: "" });
        });
    };

    return (
        <section
            id="contact"
            className="py-20 px-8"
            style={{
                backgroundColor: '#18232D',
                fontFamily: 'Rethink Sans, sans-serif'
            }}
        >
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <p className="text-lg text-white">
                        Let's discuss a project together
                    </p>
                    {success && <p className="text-green-400">✅ Message sent!</p>}
                    {error && <p className="text-red-400">❌ Failed to send. Try again.</p>}
                </div>

                <div className="space-y-6">
                    {/* Contact Form with opacity background */}
                    <div
                        className="p-8 rounded-lg"
                        style={{
                            backgroundColor: 'rgba(227, 118, 101, 0.11)' // E37665 with 11% opacity
                        }}
                    >
                        <form className="space-y-6">
                            <div>
                                <input
                                    type="text"
                                    required
                                    name='from_name'
                                    value={formData.from_name}
                                    onChange={handleChange}
                                    placeholder="Your name"
                                    className="w-full px-4 py-4 text-white placeholder-gray-400 focus:outline-none"
                                    style={{
                                        backgroundColor: '#18232D',
                                        fontSize: '14px',
                                        fontFamily: 'Rethink Sans, sans-serif'
                                    }}
                                />
                            </div>

                            <div>
                                <input
                                    type="email"
                                    name="reply_to"
                                    required
                                    value={formData.reply_to}
                                    onChange={handleChange}
                                    placeholder="Your email"
                                    className="w-full px-4 py-4 text-white placeholder-gray-400 focus:outline-none"
                                    style={{
                                        backgroundColor: '#18232D',
                                        fontSize: '14px',
                                        fontFamily: 'Rethink Sans, sans-serif'
                                    }}
                                />
                            </div>

                            <div>
                                <textarea
                                    name="message"
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Your message"
                                    rows={6}
                                    className="w-full px-4 py-4 text-white placeholder-gray-400 focus:outline-none resize-none"
                                    style={{
                                        backgroundColor: '#18232D',
                                        fontSize: '14px',
                                        fontFamily: 'Rethink Sans, sans-serif'
                                    }}
                                ></textarea>
                            </div>
                        </form>
                    </div>

                    {/* Send Message Button - centered below form */}
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            disabled={isSending}
                            onClick={handleSubmit}
                            className="text-white px-8 py-3 transition-all duration-300"
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
                            {isSending ? "Sending..." : "Send Message"}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}