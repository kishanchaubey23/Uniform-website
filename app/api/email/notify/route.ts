import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import OrderStatusEmail from '@/components/emails/order-status';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, customerName, orderId, status, total } = body;

    if (!email || !customerName || !orderId || !status || total === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
       console.error("RESEND_API_KEY is missing. Mocking email send for development.");
       // In dev without keys, we just pretend it worked so it doesn't break checkout testing
       return NextResponse.json({ success: true, mocked: true });
    }

    const getSubject = () => {
      switch (status) {
        case 'CONFIRMED': return `Order Confirmed: #${orderId}`;
        case 'SHIPPED': return `Your Order #${orderId} Has Shipped!`;
        case 'OUT_FOR_DELIVERY': return `Out for Delivery: Order #${orderId}`;
        default: return `Update on Order #${orderId}`;
      }
    };

    const data = await resend.emails.send({
      from: 'MK Creations <orders@mkcreations.com>', // MUST BE a verified domain on Resend in production
      to: [email],
      subject: getSubject(),
      react: OrderStatusEmail({ customerName, orderId, status, total }),
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Failed to send email:', error);
    return NextResponse.json(
      { error: 'Internal server error while sending email' },
      { status: 500 }
    );
  }
}
