-- Create the products table (if it doesn't exist)
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  description TEXT NOT NULL,
  details JSONB NOT NULL DEFAULT '[]',
  sizes JSONB NOT NULL DEFAULT '[]',
  image TEXT NOT NULL,
  badge TEXT
);

-- Note: To seed the original products, you can run an INSERT command. 
-- For now, they will just exist in the DB completely empty until you add them via the Admin panel.

-- Create the orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_email TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  phone TEXT,
  total DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'CONFIRMED', -- CONFIRMED, SHIPPED, OUT_FOR_DELIVERY
  razorpay_order_id TEXT,
  items JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist so the script runs cleanly
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON products;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON products;
DROP POLICY IF EXISTS "Enable all for authenticated users" ON orders;
DROP POLICY IF EXISTS "Enable insert for unauthenticated users" ON orders;

-- Allow public read access to products
CREATE POLICY "Public profiles are viewable by everyone." ON products
  FOR SELECT USING (true);

-- Allow authenticated admins to do everything (replace 'admin@mkcreations.com' if needed)
-- For simplicity, we disable restrictive insertion initially or you can configure it via Dashboard policies.
-- Let's just create an authenticated policy to insert/update.
CREATE POLICY "Enable insert for authenticated users only" ON products
  FOR ALL TO authenticated  USING (true);

CREATE POLICY "Enable all for authenticated users" ON orders
  FOR ALL TO authenticated USING (true);

-- Allow public to insert orders (unauthenticated checkouts)
CREATE POLICY "Enable insert for unauthenticated users" ON orders 
  FOR INSERT WITH CHECK (true);

 