import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { OrderTracker } from "@/components/order-tracker";
import { PackageX } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "My Orders | MK Creations",
};

export default async function OrdersPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch user orders securely from the database
  let orders: any[] = [];
  try {
    const { data } = await supabase
      .from("orders")
      .select("*")
      .eq("user_email", user.email)
      .order("created_at", { ascending: false });

    if (data) orders = data;
  } catch (error) {
    console.error("Failed to fetch orders:", error);
  }

  return (
    <main className="min-h-screen bg-muted/20">
      <Navbar />
      <div className="pt-32 pb-24 mx-auto max-w-4xl px-6">
        <div className="mb-10 animate-fade-in">
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-muted-foreground">
            Order History
          </p>
          <h1 className="font-serif text-4xl text-foreground md:text-5xl">
            My Orders
          </h1>
        </div>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center rounded-2xl border border-border bg-card shadow-sm animate-fade-up">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
              <PackageX className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="font-serif text-2xl text-foreground">
              No orders yet
            </h2>
            <p className="mt-2 mb-8 max-w-sm text-muted-foreground leading-relaxed">
              Looks like you haven't placed any orders with us yet. When you do, you'll be able to track them here!
            </p>
            <Button asChild className="rounded-full bg-foreground px-8 hover:bg-foreground/90">
              <Link href="/products">Browse Uniforms</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-12">
            {orders.map((order, i) => (
              <div 
                key={order.id} 
                className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm animate-fade-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-border">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1">
                      Order ID
                    </p>
                    <p className="font-mono text-sm text-foreground">
                      {order.id}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1">
                      Date Placed
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {new Date(order.created_at).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1">
                      Total Amount
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      ${Number(order.total).toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Progress Tracker Visual */}
                <div className="mb-8">
                  <OrderTracker currentStatus={order.status} />
                </div>

                <div>
                   <h3 className="text-xs font-medium uppercase tracking-widest text-foreground mb-4">
                     Items Included
                   </h3>
                   <div className="grid gap-3 sm:grid-cols-2">
                     {Array.isArray(order.items) && order.items.map((item: any, idx: number) => (
                       <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50">
                         <div>
                           <p className="text-sm font-medium">{item.id.replace(/-/g, ' ')}</p>
                           <p className="text-xs text-muted-foreground">Size: {item.size} • Qty: {item.qty}</p>
                         </div>
                         <p className="text-sm font-medium">${(item.price * item.qty).toFixed(2)}</p>
                       </div>
                     ))}
                   </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
