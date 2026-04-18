export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  details: string[];
  sizes: string[];
  image: string;
  badge?: string;
}

export const products: Product[] = [
  {
    id: "blazer-navy",
    name: "Classic Navy Blazer",
    category: "Blazers & Jackets",
    price: 89.99,
    description:
      "A premium tailored navy blazer featuring a gold-embroidered school crest on the breast pocket. Crafted from durable poly-wool blend fabric that maintains its shape through daily wear and multiple washes.",
    details: [
      "65% Polyester, 35% Wool blend",
      "Gold-embroidered school crest",
      "Two-button front closure",
      "Interior pocket with reinforced stitching",
      "Machine washable at 30 degrees",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    image: "/images/products/blazer-navy.jpg",
    badge: "Best Seller",
  },
  {
    id: "shirt-white",
    name: "Premium White Shirt",
    category: "Shirts & Blouses",
    price: 24.99,
    description:
      "A crisp, easy-iron white school shirt designed for everyday comfort. The breathable cotton-blend fabric keeps students cool and comfortable throughout the day while maintaining a smart appearance.",
    details: [
      "60% Cotton, 40% Polyester blend",
      "Easy-iron finish",
      "Reinforced collar and cuffs",
      "Chest pocket included",
      "Available in regular and slim fit",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    image: "/images/products/shirt-white.jpg",
  },
  {
    id: "trousers-grey",
    name: "Grey School Trousers",
    category: "Trousers & Skirts",
    price: 34.99,
    description:
      "Durable grey trousers built for the demands of school life. Features an adjustable waistband for growing students and reinforced knees for extended wear.",
    details: [
      "100% Polyester with Teflon coating",
      "Adjustable internal waistband",
      "Reinforced knee panels",
      "Crease-resistant finish",
      "Two side pockets, one back pocket",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    image: "/images/products/trousers-grey.jpg",
  },
  {
    id: "skirt-plaid",
    name: "Plaid Tartan Skirt",
    category: "Trousers & Skirts",
    price: 39.99,
    description:
      "A classic plaid skirt in traditional navy and green tartan. Features a comfortable elasticated waistband and adjustable hem for the perfect fit as students grow.",
    details: [
      "Poly-viscose tartan fabric",
      "Elasticated waistband",
      "Adjustable hem length",
      "Side zip closure",
      "Sits just above the knee",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    image: "/images/products/skirt-plaid.jpg",
    badge: "New",
  },
  {
    id: "tie-striped",
    name: "Striped School Tie",
    category: "Accessories",
    price: 12.99,
    description:
      "A smart diagonal-striped school tie in navy and gold. Made from stain-resistant polyester with a pre-formed knot option for younger students.",
    details: [
      "100% Polyester satin",
      "Stain-resistant coating",
      "Standard and clip-on versions",
      "School colors: Navy and Gold",
      "One size fits all",
    ],
    sizes: ["Standard", "Clip-on"],
    image: "/images/products/tie-striped.jpg",
  },
  {
    id: "pe-polo",
    name: "PE Polo Shirt",
    category: "Sportswear",
    price: 19.99,
    description:
      "A breathable performance polo shirt designed for physical education and sports activities. Features moisture-wicking fabric and a small embroidered school crest.",
    details: [
      "100% Moisture-wicking polyester",
      "UPF 30+ sun protection",
      "Embroidered school crest",
      "Ribbed collar",
      "Tagless comfort label",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    image: "/images/products/pe-polo.jpg",
  },
  {
    id: "sweater-navy",
    name: "V-Neck School Sweater",
    category: "Blazers & Jackets",
    price: 29.99,
    description:
      "A warm V-neck sweater with contrasting trim, perfect for layering during colder months. The soft acrylic blend provides warmth without bulk.",
    details: [
      "50% Acrylic, 50% Cotton blend",
      "Burgundy and gold contrast trim",
      "Ribbed cuffs and hem",
      "Machine washable",
      "Pill-resistant fabric",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    image: "/images/products/sweater-navy.jpg",
  },
  {
    id: "shorts-navy",
    name: "PE Sport Shorts",
    category: "Sportswear",
    price: 16.99,
    description:
      "Lightweight, quick-dry sport shorts for PE and athletics. Features an elasticated waistband with drawcord and built-in brief for active comfort.",
    details: [
      "100% Recycled polyester",
      "Quick-dry technology",
      "Elasticated waistband with drawcord",
      "Built-in brief",
      "Reflective school logo",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    image: "/images/products/shorts-navy.jpg",
    badge: "Eco",
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export const categories = [
  "All",
  "Blazers & Jackets",
  "Shirts & Blouses",
  "Trousers & Skirts",
  "Accessories",
  "Sportswear",
];
