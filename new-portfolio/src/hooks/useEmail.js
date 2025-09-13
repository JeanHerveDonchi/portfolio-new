import { useEffect, useState } from "react";
import { sendEmail } from "../services/emailService";

export function useEmail() {
    const [isSending, setIsSending] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const send = async (formData) => {
        setIsSending(true);
        setSuccess(null);
        setError(null);

        try {
            await sendEmail(formData);
            setSuccess(true);
        } catch (err) {
            console.log("Email error:",err);
            setError(err);
            setSuccess(false);
        } finally {
            setIsSending(false);
        }
    };

    useEffect (() => {
     if (success !== null || error) {
        const timer = setTimeout(() => {
            setSuccess(null);
            setError(null);
        }, 3000);
        return () => clearTimeout(timer);
     }   
    }, [success, error]);

    return {send, isSending, success, error};
}