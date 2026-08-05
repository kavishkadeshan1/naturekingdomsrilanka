import { Request, Response } from 'express';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  guestType: 'local' | 'foreign';
  roomType: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  message: string;
  submittedAt: string;
}

// In-memory store (replace with DB later)
const inquiries: Inquiry[] = [];

export const submitInquiry = (req: Request, res: Response): void => {
  try {
    const { name, email, phone, guestType, roomType, checkIn, checkOut, guests, message } = req.body;

    // Basic validation
    if (!name || !email || !guestType || !roomType || !checkIn || !checkOut) {
      res.status(400).json({ success: false, message: 'Please fill in all required fields.' });
      return;
    }

    const inquiry: Inquiry = {
      id: `INQ-${Date.now()}`,
      name,
      email,
      phone: phone || '',
      guestType,
      roomType,
      checkIn,
      checkOut,
      guests: Number(guests) || 1,
      message: message || '',
      submittedAt: new Date().toISOString(),
    };

    inquiries.push(inquiry);

    console.log(`📩 New Inquiry received: ${inquiry.id} from ${inquiry.name} (${inquiry.email})`);

    res.status(201).json({
      success: true,
      message: `Thank you ${name}! Your inquiry has been received. We will contact you within 24 hours.`,
      inquiryId: inquiry.id,
    });
  } catch (error) {
    console.error('Error processing inquiry:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
};

export const getInquiries = (_req: Request, res: Response): void => {
  res.json({ success: true, count: inquiries.length, data: inquiries });
};
