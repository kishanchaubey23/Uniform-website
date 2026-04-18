import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import AdminDashboard from "./admin-dashboard";

export const metadata = {
  title: "Admin Dashboard | MK Creations",
};

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Restrict access to a specific admin email
  const ADMIN_EMAIL = "chaubeykishan027@gmail.com"; // Replace with your desired admin email

  if (!user || user.email !== ADMIN_EMAIL) {
    redirect("/login");
  }

  // Fetch metrics and data
  // Using an elegant fallback if tables don't exist yet so the page doesn't crash
  let products = [];
  let orders = [];
  let revenue = 0;

  try {
    const [{ data: pData }, { data: oData }] = await Promise.all([
      supabase.from("products").select("*").order("name"),
      supabase.from("orders").select("*").order("created_at", { ascending: false }),
    ]);
    
    if (pData) products = pData;
    if (oData) {
      orders = oData;
      revenue = orders.reduce((sum, order) => sum + Number(order.total), 0);
    }
  } catch (error) {
    console.error("Supabase fetch error. Tables might not be set up yet.", error);
  }

  return (
    <main className="min-h-screen bg-muted/40">
      <Navbar />
      <div className="pt-28 pb-24 mx-auto max-w-7xl px-6">
        <div className="mb-10">
          <h1 className="font-serif text-4xl text-foreground">Admin Dashboard</h1>
          <p className="mt-2 text-muted-foreground">Manage products, view orders, and track revenue.</p>
        </div>
        
        {/* Pass initial data to a client component for interactivity */}
        <AdminDashboard initialProducts={products} initialOrders={orders} totalRevenue={revenue} />
      </div>
      <Footer />
    </main>
  );
}
