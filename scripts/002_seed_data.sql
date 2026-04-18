-- Seed schools
INSERT INTO public.schools (id, name, slug, location, phone, email, students) VALUES
  ('a1b2c3d4-0001-4000-8000-000000000001', 'St. Andrews Academy', 'st-andrews-academy', '123 Elm Street, Springfield', '+1 (555) 100-2001', 'info@standrews.edu', '1,200+'),
  ('a1b2c3d4-0002-4000-8000-000000000002', 'Oakwood International', 'oakwood-international', '456 Oak Avenue, Riverside', '+1 (555) 100-2002', 'admin@oakwood.edu', '850+'),
  ('a1b2c3d4-0003-4000-8000-000000000003', 'Riverside Grammar', 'riverside-grammar', '789 River Road, Lakewood', '+1 (555) 100-2003', 'office@riverside.edu', '1,500+'),
  ('a1b2c3d4-0004-4000-8000-000000000004', 'Hillcrest Preparatory', 'hillcrest-preparatory', '321 Hill Drive, Crestview', '+1 (555) 100-2004', 'hello@hillcrest.edu', '600+'),
  ('a1b2c3d4-0005-4000-8000-000000000005', 'Maple Leaf School', 'maple-leaf-school', '654 Maple Lane, Greenville', '+1 (555) 100-2005', 'contact@mapleleaf.edu', '950+'),
  ('a1b2c3d4-0006-4000-8000-000000000006', 'Wellington College', 'wellington-college', '987 Wellington Blvd, Fairview', '+1 (555) 100-2006', 'info@wellington.edu', '1,100+')
ON CONFLICT (id) DO NOTHING;

-- Seed products
INSERT INTO public.products (id, slug, name, description, price, category, sizes, image, details, badge) VALUES
  ('b1b2c3d4-0001-4000-8000-000000000001', 'classic-navy-blazer', 'Classic Navy Blazer', 'Premium wool-blend school blazer with embroidered crest. Fully lined with internal pockets and durable brass buttons.', 89.99, 'Blazers', ARRAY['XS','S','M','L','XL'], '/images/products/blazer-navy.jpg', ARRAY['Wool-blend fabric','Embroidered school crest','Brass button fastening','Fully lined interior','Two front pockets'], 'Best Seller'),
  ('b1b2c3d4-0002-4000-8000-000000000002', 'white-dress-shirt', 'White Dress Shirt', 'Crisp white cotton shirt with reinforced collar. Easy-iron finish for a sharp look every day.', 24.99, 'Shirts', ARRAY['XS','S','M','L','XL'], '/images/products/shirt-white.jpg', ARRAY['100% cotton fabric','Easy-iron finish','Reinforced collar','Button cuff','Chest pocket'], NULL),
  ('b1b2c3d4-0003-4000-8000-000000000003', 'grey-school-trousers', 'Grey School Trousers', 'Durable flat-front trousers with adjustable waist. Stain-resistant finish keeps them looking fresh.', 34.99, 'Trousers', ARRAY['XS','S','M','L','XL'], '/images/products/trousers-grey.jpg', ARRAY['Polyester-viscose blend','Adjustable waistband','Stain-resistant coating','Machine washable','Flat-front design'], NULL),
  ('b1b2c3d4-0004-4000-8000-000000000004', 'tartan-plaid-skirt', 'Tartan Plaid Skirt', 'Traditional plaid skirt in navy-green tartan. Box pleat design with adjustable waist for a comfortable fit.', 32.99, 'Skirts', ARRAY['XS','S','M','L','XL'], '/images/products/skirt-plaid.jpg', ARRAY['Woven tartan fabric','Box pleat design','Adjustable waistband','Side zip closure','Knee length'], 'New'),
  ('b1b2c3d4-0005-4000-8000-000000000005', 'striped-school-tie', 'Striped School Tie', 'Classic diagonal stripe tie in school colors. Clip-on and full-length options available.', 12.99, 'Accessories', ARRAY['One Size'], '/images/products/tie-striped.jpg', ARRAY['Polyester satin','Diagonal stripe pattern','Pre-tied clip-on option','Full-length option','School color variants'], NULL),
  ('b1b2c3d4-0006-4000-8000-000000000006', 'pe-polo-shirt', 'PE Polo Shirt', 'Moisture-wicking polo for sports and PE class. Lightweight mesh panels for breathability.', 19.99, 'Sportswear', ARRAY['XS','S','M','L','XL'], '/images/products/pe-polo.jpg', ARRAY['Moisture-wicking fabric','Mesh side panels','Embroidered crest','Ribbed collar','Tag-free label'], NULL),
  ('b1b2c3d4-0007-4000-8000-000000000007', 'v-neck-school-sweater', 'V-Neck School Sweater', 'Warm V-neck sweater with contrast trim. Anti-pill fabric that maintains its shape wash after wash.', 29.99, 'Blazers', ARRAY['XS','S','M','L','XL'], '/images/products/sweater-navy.jpg', ARRAY['Acrylic knit','Anti-pill finish','Contrast V-neck trim','Ribbed cuffs and hem','Machine washable'], NULL),
  ('b1b2c3d4-0008-4000-8000-000000000008', 'sport-shorts', 'Sport Shorts', 'Lightweight PE shorts with elastic waist. Internal brief lining for comfort during activity.', 16.99, 'Sportswear', ARRAY['XS','S','M','L','XL'], '/images/products/shorts-navy.jpg', ARRAY['Quick-dry polyester','Elastic waistband','Internal brief lining','Side pockets','Reinforced seams'], NULL)
ON CONFLICT (id) DO NOTHING;

-- Link products to schools
INSERT INTO public.school_products (school_id, product_id) VALUES
  ('a1b2c3d4-0001-4000-8000-000000000001', 'b1b2c3d4-0001-4000-8000-000000000001'),
  ('a1b2c3d4-0001-4000-8000-000000000001', 'b1b2c3d4-0002-4000-8000-000000000002'),
  ('a1b2c3d4-0001-4000-8000-000000000001', 'b1b2c3d4-0003-4000-8000-000000000003'),
  ('a1b2c3d4-0001-4000-8000-000000000001', 'b1b2c3d4-0005-4000-8000-000000000005'),
  ('a1b2c3d4-0001-4000-8000-000000000001', 'b1b2c3d4-0006-4000-8000-000000000006'),
  ('a1b2c3d4-0001-4000-8000-000000000001', 'b1b2c3d4-0007-4000-8000-000000000007'),
  ('a1b2c3d4-0002-4000-8000-000000000002', 'b1b2c3d4-0001-4000-8000-000000000001'),
  ('a1b2c3d4-0002-4000-8000-000000000002', 'b1b2c3d4-0002-4000-8000-000000000002'),
  ('a1b2c3d4-0002-4000-8000-000000000002', 'b1b2c3d4-0004-4000-8000-000000000004'),
  ('a1b2c3d4-0002-4000-8000-000000000002', 'b1b2c3d4-0005-4000-8000-000000000005'),
  ('a1b2c3d4-0002-4000-8000-000000000002', 'b1b2c3d4-0008-4000-8000-000000000008'),
  ('a1b2c3d4-0003-4000-8000-000000000003', 'b1b2c3d4-0001-4000-8000-000000000001'),
  ('a1b2c3d4-0003-4000-8000-000000000003', 'b1b2c3d4-0002-4000-8000-000000000002'),
  ('a1b2c3d4-0003-4000-8000-000000000003', 'b1b2c3d4-0003-4000-8000-000000000003'),
  ('a1b2c3d4-0003-4000-8000-000000000003', 'b1b2c3d4-0004-4000-8000-000000000004'),
  ('a1b2c3d4-0003-4000-8000-000000000003', 'b1b2c3d4-0005-4000-8000-000000000005'),
  ('a1b2c3d4-0003-4000-8000-000000000003', 'b1b2c3d4-0006-4000-8000-000000000006'),
  ('a1b2c3d4-0003-4000-8000-000000000003', 'b1b2c3d4-0007-4000-8000-000000000007'),
  ('a1b2c3d4-0003-4000-8000-000000000003', 'b1b2c3d4-0008-4000-8000-000000000008'),
  ('a1b2c3d4-0004-4000-8000-000000000004', 'b1b2c3d4-0002-4000-8000-000000000002'),
  ('a1b2c3d4-0004-4000-8000-000000000004', 'b1b2c3d4-0003-4000-8000-000000000003'),
  ('a1b2c3d4-0004-4000-8000-000000000004', 'b1b2c3d4-0005-4000-8000-000000000005'),
  ('a1b2c3d4-0004-4000-8000-000000000004', 'b1b2c3d4-0007-4000-8000-000000000007'),
  ('a1b2c3d4-0004-4000-8000-000000000004', 'b1b2c3d4-0008-4000-8000-000000000008'),
  ('a1b2c3d4-0005-4000-8000-000000000005', 'b1b2c3d4-0001-4000-8000-000000000001'),
  ('a1b2c3d4-0005-4000-8000-000000000005', 'b1b2c3d4-0002-4000-8000-000000000002'),
  ('a1b2c3d4-0005-4000-8000-000000000005', 'b1b2c3d4-0004-4000-8000-000000000004'),
  ('a1b2c3d4-0005-4000-8000-000000000005', 'b1b2c3d4-0006-4000-8000-000000000006'),
  ('a1b2c3d4-0005-4000-8000-000000000005', 'b1b2c3d4-0007-4000-8000-000000000007'),
  ('a1b2c3d4-0006-4000-8000-000000000006', 'b1b2c3d4-0001-4000-8000-000000000001'),
  ('a1b2c3d4-0006-4000-8000-000000000006', 'b1b2c3d4-0002-4000-8000-000000000002'),
  ('a1b2c3d4-0006-4000-8000-000000000006', 'b1b2c3d4-0003-4000-8000-000000000003'),
  ('a1b2c3d4-0006-4000-8000-000000000006', 'b1b2c3d4-0005-4000-8000-000000000005'),
  ('a1b2c3d4-0006-4000-8000-000000000006', 'b1b2c3d4-0006-4000-8000-000000000006'),
  ('a1b2c3d4-0006-4000-8000-000000000006', 'b1b2c3d4-0008-4000-8000-000000000008')
ON CONFLICT DO NOTHING;
