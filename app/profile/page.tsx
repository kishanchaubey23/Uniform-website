import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { User, Mail, Shield, Calendar } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "My Profile | MK Creations",
};

export default async function ProfilePage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const fullName = user.user_metadata?.full_name || "Valued Customer";
  const userInitials = fullName.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase();

  return (
    <main className="min-h-screen bg-muted/20">
      <Navbar />
      <div className="pt-32 pb-24 mx-auto max-w-4xl px-6">
        <div className="mb-10 animate-fade-in">
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-muted-foreground">
            Account Management
          </p>
          <h1 className="font-serif text-4xl text-foreground md:text-5xl">
            My Profile
          </h1>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3 animate-fade-up" style={{ animationDelay: "100ms" }}>
          
          {/* Avatar / Profile Card */}
          <div className="md:col-span-1 rounded-2xl border border-border bg-card p-8 flex flex-col items-center text-center shadow-sm">
            <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center text-3xl font-serif text-primary border-4 border-background shadow-sm mb-6">
              {userInitials}
            </div>
            <h2 className="text-xl font-medium text-foreground mb-1">{fullName}</h2>
            <p className="text-sm text-muted-foreground mb-6 flex items-center gap-2">
               <Mail className="h-4 w-4" /> {user.email}
            </p>
            <div className="w-full flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-widest text-emerald-600 bg-emerald-100 rounded-full py-1.5 px-4 mb-4">
              <Shield className="h-3.5 w-3.5" /> Verified Account
            </div>
            <Separator className="my-4 w-full" />
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" /> 
              Member since {new Date(user.created_at).toLocaleDateString()}
            </div>
          </div>

          {/* Details Card */}
          <div className="md:col-span-2 rounded-2xl border border-border bg-card p-8 shadow-sm">
             <h3 className="font-serif text-2xl text-foreground mb-6">Personal Details</h3>
             
             <div className="space-y-6">
                <div>
                  <label className="block text-xs font-medium uppercase tracking-widest text-muted-foreground mb-2">
                    Full Name
                  </label>
                  <div className="px-4 py-3 bg-muted/40 rounded-lg text-sm text-foreground border border-border/50">
                    {fullName}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium uppercase tracking-widest text-muted-foreground mb-2">
                    Email Address
                  </label>
                  <div className="px-4 py-3 bg-muted/40 rounded-lg text-sm text-foreground border border-border/50">
                    {user.email}
                  </div>
                </div>

                <div className="pt-4 border-t border-border mt-8">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    This information was securely recorded during your sign-up process. To alter your primary authentication email or reset your password, please contact our support team.
                  </p>
                </div>
             </div>
          </div>

        </div>
      </div>
      <Footer />
    </main>
  );
}
