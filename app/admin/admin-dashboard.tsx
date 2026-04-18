"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Package, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AdminDashboard({ initialProducts, initialOrders, totalRevenue }: any) {
  const [orders, setOrders] = useState(initialOrders);

  const updateOrderStatus = async (orderId: string, newStatus: string, email: string, name: string) => {
    // Optimistic UI Update
    setOrders((prev: any) => 
      prev.map((o: any) => o.id === orderId ? { ...o, status: newStatus } : o)
    );

    try {
      // 1. Update Database (mocking if tables aren't setup yet)
      const { createClient } = await import('@/lib/supabase/client');
      const supabase = createClient();
      await supabase.from("orders").update({ status: newStatus }).eq("id", orderId);

      // 2. Trigger Email Notification via Resend
      await fetch('/api/email/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          customerName: name,
          orderId,
          status: newStatus,
          total: orders.find((o: any) => o.id === orderId)?.total || 0,
        })
      });

      alert(`Order updated to ${newStatus} and email sent successfully!`);
    } catch (e) {
      console.error("Error updating order:", e);
      alert("Failed to update order or send email. Ensure database is setup.");
    }
  };

  return (
    <Tabs defaultValue="overview" className="space-y-8">
      <TabsList className="grid w-full grid-cols-3 max-w-[400px]">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="products">Products</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4 animate-fade-in">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{orders.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{initialProducts.length}</div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="orders" className="animate-fade-in">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {orders.length === 0 ? (
               <p className="text-sm text-muted-foreground py-4">No orders have been placed yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="border-b bg-muted/50">
                    <tr>
                      <th className="p-3">Order ID</th>
                      <th className="p-3">Customer</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">Total</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order: any) => (
                      <tr key={order.id} className="border-b">
                        <td className="p-3 font-mono text-xs">{order.id.split('-')[0]}</td>
                        <td className="p-3">{order.customer_name} <br/><span className="text-xs text-muted-foreground">{order.user_email}</span></td>
                        <td className="p-3">{new Date(order.created_at).toLocaleDateString()}</td>
                        <td className="p-3">${Number(order.total).toFixed(2)}</td>
                        <td className="p-3">
                          <Badge variant="outline" className={
                             order.status === 'CONFIRMED' ? "bg-blue-100 text-blue-800" :
                             order.status === 'SHIPPED' ? "bg-amber-100 text-amber-800" :
                             "bg-emerald-100 text-emerald-800"
                          }>
                            {order.status}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <select 
                            className="bg-background border rounded px-2 py-1 text-xs"
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value, order.user_email, order.customer_name)}
                          >
                            <option value="CONFIRMED">Confirmed</option>
                            <option value="SHIPPED">Shipped</option>
                            <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="products" className="animate-fade-in">
        <Card>
          <CardHeader>
            <CardTitle>Product Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-6">
              To add products initially, run the SQL script provided in Supabase. Full product addition UI can be built here.
            </p>
            {initialProducts.length === 0 ? (
               <p className="text-sm text-muted-foreground">No products found in DB. You are likely currently using the old hardcoded products. Run the SQL schema to initialize the database.</p>
            ) : (
               <ul className="divide-y border rounded-md">
                 {initialProducts.map((p: any) => (
                   <li key={p.id} className="p-3 flex justify-between items-center">
                     <div>
                       <p className="font-medium">{p.name}</p>
                       <p className="text-xs text-muted-foreground">{p.category}</p>
                     </div>
                     <span className="font-bold">${p.price}</span>
                   </li>
                 ))}
               </ul>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
