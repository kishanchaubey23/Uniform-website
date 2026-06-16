"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DollarSign, Package, ShoppingCart, GraduationCap, ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addProduct, addSchool, updateProductInventory, removeProduct, removeSchool } from "./actions";

export default function AdminDashboard({ initialProducts, initialOrders, initialSchools, totalRevenue }: any) {
  const [orders, setOrders] = useState(initialOrders || []);
  const [products, setProducts] = useState(initialProducts || []);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const updateOrderStatus = async (orderId: string, newStatus: string, email: string, name: string) => {
    setOrders((prev: any) => 
      prev.map((o: any) => o.id === orderId ? { ...o, status: newStatus } : o)
    );
    try {
      const { createClient } = await import('@/lib/supabase/client');
      const supabase = createClient();
      await supabase.from("orders").update({ status: newStatus }).eq("id", orderId);

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

  const handleUpdateInventory = async (id: string, field: string, value: number) => {
    const val = isNaN(value) ? 0 : value;
    setProducts((prev:any) => prev.map((p:any) => p.id === id ? { ...p, [field]: val } : p));
    await updateProductInventory(id, { [field]: val });
  };

  return (
    <Tabs defaultValue="overview" className="space-y-8">
      <TabsList className="grid w-full grid-cols-4 max-w-[500px]">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="products">Products</TabsTrigger>
        <TabsTrigger value="schools">Schools</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4 animate-fade-in">
        <div className="grid gap-4 md:grid-cols-4">
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
              <div className="text-2xl font-bold">{products.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Schools</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{initialSchools?.length || 0}</div>
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
                      <th className="p-3 w-10"></th>
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
                      <React.Fragment key={order.id}>
                        <tr className="border-b hover:bg-muted/30">
                          <td className="p-3 cursor-pointer" onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}>
                            {expandedOrder === order.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                          </td>
                          <td className="p-3 font-mono text-xs">{order.id.split('-')[0]}</td>
                          <td className="p-3">{order.customer_name} <br/><span className="text-xs text-muted-foreground">{order.user_email}</span></td>
                          <td className="p-3">{new Date(order.created_at).toLocaleDateString()}</td>
                          <td className="p-3 font-medium">${Number(order.total).toFixed(2)}</td>
                          <td className="p-3">
                            <Badge variant="outline" className={
                               order.status === 'CONFIRMED' ? "bg-blue-100 text-blue-800 border-blue-200" :
                               order.status === 'SHIPPED' ? "bg-amber-100 text-amber-800 border-amber-200" :
                               "bg-emerald-100 text-emerald-800 border-emerald-200"
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
                              <option value="OUT_FOR_DELIVERY">Out for Deli</option>
                            </select>
                          </td>
                        </tr>
                        {expandedOrder === order.id && (
                          <tr className="bg-muted/10 border-b">
                            <td colSpan={7} className="p-4">
                               <div className="rounded-md border bg-background p-4">
                                 <h4 className="font-semibold mb-3 text-sm">Order Items</h4>
                                 <ul className="space-y-3">
                                   {(typeof order.items === 'string' ? JSON.parse(order.items) : order.items)?.map((item: any, idx: number) => (
                                     <li key={idx} className="flex justify-between items-center text-sm">
                                       <div className="flex items-center gap-3">
                                          <div className="w-10 h-10 rounded bg-muted overflow-hidden flex-shrink-0">
                                            {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
                                          </div>
                                          <div>
                                            <p className="font-medium">{item.name}</p>
                                            <p className="text-muted-foreground text-xs">Size: {item.size} | Qty: {item.quantity}</p>
                                          </div>
                                       </div>
                                       <div className="font-medium">
                                          ${(item.price * item.quantity).toFixed(2)}
                                       </div>
                                     </li>
                                   ))}
                                 </ul>
                               </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="products" className="animate-fade-in space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Add New Product</CardTitle>
            <CardDescription>Create a new product in the catalog.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={async (formData) => {
              setIsLoading(true);
              const res = await addProduct(formData);
              if(res?.error) alert(res.error);
              else alert("Success!");
              setIsLoading(false);
            }} className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input name="name" required placeholder="e.g. Navy Blue Blazer" />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Input name="category" required placeholder="e.g. Blazers" />
              </div>
              <div className="space-y-2">
                <Label>Price</Label>
                <Input name="price" type="number" step="0.01" required placeholder="45.00" />
              </div>
              <div className="space-y-2">
                <Label>Initial Stock</Label>
                <Input name="stock" type="number" defaultValue="50" required />
              </div>
              <div className="space-y-2">
                <Label>Image URL</Label>
                <Input name="image" required placeholder="/images/products/..." />
              </div>
              <div className="space-y-2">
                <Label>Badge (Optional)</Label>
                <Input name="badge" placeholder="e.g. Best Seller" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Description</Label>
                <Input name="description" required placeholder="Product details..." />
              </div>
              <Button type="submit" disabled={isLoading} className="sm:col-span-2 mt-2">
                {isLoading ? "Saving..." : "Create Product"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inventory Management</CardTitle>
            <CardDescription>Track and update stock, sales, returns and exchanges.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
               <table className="w-full text-sm text-left">
                  <thead className="border-b bg-muted/50">
                    <tr>
                      <th className="p-3">Product</th>
                      <th className="p-3 text-center">Stock</th>
                      <th className="p-3 text-center">Sold</th>
                      <th className="p-3 text-center">Returns</th>
                      <th className="p-3 text-center">Exchanged</th>
                      <th className="p-3 text-center w-10">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p: any) => (
                      <tr key={p.id} className="border-b hover:bg-muted/30">
                        <td className="p-3">
                          <p className="font-medium">{p.name}</p>
                          <p className="text-xs text-muted-foreground">{p.category} - ${p.price}</p>
                        </td>
                        <td className="p-3 text-center">
                          <Input 
                            type="number" 
                            className="w-20 mx-auto text-center h-8" 
                            defaultValue={p.stock || 0}
                            onBlur={(e) => handleUpdateInventory(p.id, 'stock', parseInt(e.target.value))}
                          />
                        </td>
                        <td className="p-3 text-center">
                          <Input 
                            type="number" 
                            className="w-20 mx-auto text-center h-8" 
                            defaultValue={p.sold || 0}
                            onBlur={(e) => handleUpdateInventory(p.id, 'sold', parseInt(e.target.value))}
                          />
                        </td>
                        <td className="p-3 text-center">
                          <Input 
                            type="number" 
                            className="w-20 mx-auto text-center h-8" 
                            defaultValue={p.returns || 0}
                            onBlur={(e) => handleUpdateInventory(p.id, 'returns', parseInt(e.target.value))}
                          />
                        </td>
                        <td className="p-3 text-center">
                          <Input 
                            type="number" 
                            className="w-20 mx-auto text-center h-8" 
                            defaultValue={p.exchanged || 0}
                            onBlur={(e) => handleUpdateInventory(p.id, 'exchanged', parseInt(e.target.value))}
                          />
                        </td>
                        <td className="p-3 text-center">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10" onClick={async () => {
                            if (confirm("Are you sure you want to delete this product?")) {
                              const res = await removeProduct(p.id);
                              if (res?.error) alert(res.error);
                            }
                          }}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
               </table>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="schools" className="animate-fade-in space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Add New School</CardTitle>
            <CardDescription>Register a new school to categorize uniforms.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={async (formData) => {
              setIsLoading(true);
              const res = await addSchool(formData);
              if(res?.error) alert(res.error);
              else alert("School added!");
              setIsLoading(false);
            }} className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>School Name</Label>
                <Input name="name" required placeholder="e.g. St. Jude Academy" />
              </div>
              <div className="space-y-2">
                <Label>Logo / Image URL</Label>
                <Input name="image" placeholder="https://..." />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Description</Label>
                <Input name="description" placeholder="A brief description of uniform requirements" />
              </div>
              <Button type="submit" disabled={isLoading} className="sm:col-span-2 mt-2">
                {isLoading ? "Saving..." : "Add School"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Registered Schools</CardTitle>
          </CardHeader>
          <CardContent>
            {(!initialSchools || initialSchools.length === 0) ? (
              <p className="text-sm text-muted-foreground">No schools added yet.</p>
            ) : (
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {initialSchools.map((s: any) => (
                  <li key={s.id} className="border p-4 rounded-lg flex justify-between items-center bg-card">
                    <div className="flex gap-4 items-center">
                      {s.image ? (
                        <img src={s.image} alt={s.name} className="w-12 h-12 rounded object-cover" />
                      ) : (
                        <div className="w-12 h-12 rounded bg-muted flex items-center justify-center">
                          <GraduationCap className="h-6 w-6 text-muted-foreground" />
                        </div>
                      )}
                      <div>
                        <p className="font-semibold">{s.name}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">{s.description}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10" onClick={async () => {
                      if (confirm("Are you sure you want to delete this school?")) {
                        const res = await removeSchool(s.id);
                        if (res?.error) alert(res.error);
                      }
                    }}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
