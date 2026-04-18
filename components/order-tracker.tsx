import { CheckCircle2, PackageSearch, Truck } from "lucide-react";
import { cn } from "@/lib/utils";

interface OrderTrackerProps {
  currentStatus: string;
}

const steps = [
  { id: 'CONFIRMED', label: 'Order Confirmed', icon: CheckCircle2 },
  { id: 'SHIPPED', label: 'Shipped', icon: PackageSearch },
  { id: 'OUT_FOR_DELIVERY', label: 'Out for Delivery', icon: Truck },
];

export function OrderTracker({ currentStatus }: OrderTrackerProps) {
  const currentIndex = steps.findIndex(s => s.id === currentStatus);
  
  // Provide fallback if status string doesn't perfectly match
  const activeIndex = currentIndex >= 0 ? currentIndex : 0;

  return (
    <div className="w-full py-4">
      <div className="relative flex justify-between items-center w-full">
        {/* Background Line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-muted -z-10 -translate-y-1/2 rounded-full"></div>
        
        {/* Active Progress Line */}
        <div 
           className="absolute top-1/2 left-0 h-1 bg-emerald-500 -z-10 -translate-y-1/2 rounded-full transition-all duration-700 ease-out"
           style={{ width: `${(activeIndex / (steps.length - 1)) * 100}%` }}
        ></div>

        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index <= activeIndex;
          const isCurrent = index === activeIndex;

          return (
            <div key={step.id} className="flex flex-col items-center gap-3">
              <div 
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full border-4 transition-all duration-500",
                  isActive 
                    ? "bg-emerald-500 border-background text-primary-foreground shadow-md" 
                    : "bg-muted border-background text-muted-foreground",
                  isCurrent && "ring-4 ring-emerald-500/20"
                )}
              >
                <Icon className={cn("w-4 h-4", isActive ? "text-white" : "")} />
              </div>
              <span className={cn(
                "hidden sm:block text-xs uppercase tracking-widest font-medium transition-colors",
                isActive ? "text-emerald-600" : "text-muted-foreground"
              )}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
