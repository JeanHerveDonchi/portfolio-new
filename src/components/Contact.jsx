// components/Contact.jsx
import { useState, useEffect } from 'react';
import { useEmail } from '../hooks/useEmail';

export default function Contact() {

    const { send, isSending, success, error } = useEmail();

    const [formData, setFormData] = useState({
        from_name: "",
        reply_to: "",
        message: "",
    });

    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);
    const [showErrors, setShowErrors] = useState(false);

    useEffect(() => {
        const newErrors = {};

        if (!formData.from_name.trim()) {
            newErrors.from_name = "Name is required";
        }

        if (!formData.reply_to.trim()) {
            newErrors.reply_to = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.reply_to)) {
            newErrors.reply_to = "Enter a valid email";
        }

        if (!formData.message.trim()) {
            newErrors.message = "Message is required";
        } else if (formData.message.length > 5000) {
            newErrors.message = "Message must be less than 5000 characters";
        }

        setErrors(newErrors);
        setIsValid(Object.keys(newErrors).length === 0);
    }, [formData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //do not send if form is not valid
        if (!isValid) {
            setShowErrors(true);
            return;
        }

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
                                {
                                    errors.from_name && showErrors && (
                                        <p className='text-red-400 text-sm'>{errors.from_name}</p>
                                    )
                                }
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
                                {errors.reply_to && showErrors && (
                                    <p className="text-red-400 text-sm">{errors.reply_to}</p>
                                )}
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
                                {errors.message && showErrors && (
                                    <p className="text-red-400 text-sm">{errors.message}</p>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* Send Message Button - centered below form */}
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className={`px-8 py-3 transition-all duration-300 rounded-md 
                                bg-[#E37665] text-white hover:bg-transparent
                                 hover:border-2 hover:border-[#E37665]"`}
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