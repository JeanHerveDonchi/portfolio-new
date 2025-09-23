import emailjs from "emailjs-com";
import { EMAILJSCREDENTIALS } from "../data/emailCredentials";

/**
 * Send email via EmailJS
 * @param {Object} data - Data to send (must include from_name, reply_to, message)
 * @returns {Promise}
 */
export const sendEmail = (data) => {
    const payload = {
        to_name: EMAILJSCREDENTIALS.emailName,
        ...data,
    };

    return emailjs.send(
        EMAILJSCREDENTIALS.emailServiceId,
        EMAILJSCREDENTIALS.templateId,
        payload,
        EMAILJSCREDENTIALS.publicKey
    );
};