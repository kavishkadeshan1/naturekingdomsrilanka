import { Request, Response } from 'express';
import nodemailer from 'nodemailer';

export const submitContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, contactNo, country, email, message } = req.body;

    // Basic validation
    if (!firstName || !lastName || !email || !message) {
      res.status(400).json({ success: false, message: 'Please fill in all required fields.' });
      return;
    }

    // Configure Nodemailer transporter
    // To make this work in production/Vercel, you must set EMAIL_USER and EMAIL_PASS environment variables
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself
      replyTo: email, // If you click "reply" in your email client, it goes to the user
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      html: `
        <h2>New Contact Inquiry - Nature Kingdom</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Contact No:</strong> ${contactNo || 'N/A'}</p>
        <p><strong>Country:</strong> ${country || 'N/A'}</p>
        <hr />
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Only attempt to send email if credentials exist
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      await transporter.sendMail(mailOptions);
      console.log(`✉️ Email successfully sent for inquiry from ${firstName}`);
    } else {
      console.warn('⚠️ WARNING: Email not sent. EMAIL_USER and EMAIL_PASS environment variables are not set.');
    }

    res.status(201).json({
      success: true,
      message: `Thank you ${firstName}! Your message has been sent successfully.`,
    });
  } catch (error) {
    console.error('Error processing contact message:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
};

export const getContacts = (_req: Request, res: Response): void => {
  res.status(405).json({ success: false, message: 'In-memory storage disabled. Emails are sent directly.' });
};
