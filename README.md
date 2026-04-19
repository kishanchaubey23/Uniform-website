# MK Creations - School Uniform E-Commerce Website

A modern, full-stack E-Commerce application for school uniforms built with Next.js, Supabase, and Razorpay.

## Features

- **Storefront**: Dynamic product grid with filtering by categories (Blazers & Jackets, Shirts & Blouses, etc.).
- **Authentication**: Secure user login and registration powered by Supabase Auth.
- **Cart & Checkout**: State management for user carts and a seamless checkout experience.
- **Payments**: Integrated with Razorpay for secure digital and card payments.
- **User Portal**: Authenticated `/profile` to view details and `/orders` to track past purchases with a dynamic timeline tracker.
- **Admin Dashboard**: Protected `/admin` route (exclusive to authorized admins) to view total revenue, track active orders, and update order statuses (which automatically emails customers).
- **Email Notifications**: Transactional email updates (Order Confirmed, Shipped, Out for Delivery) powered by Resend and built with React Email.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS & Vanilla CSS
- **Components**: shadcn/ui & Lucide Icons
- **Database & Auth**: Supabase
- **Payments**: Razorpay
- **Emails**: Resend & React Email

## Local Development Setup

### 1. Prerequisites
- Node.js (v18+)
- npm (Node Package Manager)

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root of the project and add the following keys:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
RESEND_API_KEY=your_resend_api_key
```

### 4. Database Setup (Supabase)
Run the `supabase_schema.sql` file provided in the repository inside your Supabase SQL Editor to initialize the necessary `products` and `orders` tables securely.

### 5. Run the Server
```bash
npm run dev
```
Navigate to `http://localhost:3001` to view the application.

## Project Structure
- `/app` - Next.js App Router providing routes like `/product`, `/cart`, `/checkout`, `/admin`, and `/api`.
- `/components` - Reusable React components including the UI primitives (`/ui`), specific modules (`hero`, `navbar`, `checkout-form`), and email templates (`/emails`).
- `/lib` - Application utilities, database connectors (`supabase`), and Context API logic (`cart-context.tsx`).
