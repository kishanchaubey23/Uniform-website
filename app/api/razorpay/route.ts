import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: Request) {
  try {
    const { amount } = await req.json();

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid amount provided" },
        { status: 400 }
      );
    }

    const key_id = process.env.RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    if (!key_id || !key_secret) {
      return NextResponse.json(
        { error: "Razorpay keys are missing from environment variables." },
        { status: 500 }
      );
    }

    const instance = new Razorpay({
      key_id,
      key_secret,
    });

    const options = {
      // Amount is in currency subunits (e.g. cents/paise).
      amount: Math.round(amount * 100), 
      // Ensure the currency matches your frontend representation. Using USD as seen in UI.
      // Note: Razorpay test accounts might strictly prefer INR if international payments are disabled.
      currency: "USD",
    };

    const order = await instance.orders.create(options);
    
    return NextResponse.json(
      { id: order.id, currency: order.currency, amount: order.amount, key_id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Razorpay order creation error:", error);
    return NextResponse.json(
      { error: "Something went wrong while generating the order" },
      { status: 500 }
    );
  }
}
