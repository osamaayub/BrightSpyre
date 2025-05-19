"use server";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY); // Use an env variable for security
interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    message: string;
}


export async function sendEmail(formData: FormData) {
    try {
        const { firstName, lastName, email, subject, message } = formData;

        const response = await resend.emails.send({
            from: 'osama.ayubwebdev@gmail.com', // Replace with a verified sender
            to: 'support@brightspyre.com',
            subject: subject,
            html: `<p><strong>Name:</strong> ${firstName} ${lastName}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong> ${message}</p>`,
        });

        return { success: true, data: response };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
