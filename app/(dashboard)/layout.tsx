import { Bell, LogOut, ShoppingBag, User } from "lucide-react";
import CartDrawer from "@/components/cart/cart-drawer";
import Sidebar from "@/components/dashboards/sidebar";
import { UserDropdown } from "@/components/dashboards/user-dropdown";

import { Button } from "@/components/ui/button";

import { useAuthToken } from "@/hooks/use-auth-token";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen overflow-hidden bg-background">
      <Sidebar />

      <div className="flex-1 overflow-hidden max-h-screen flex flex-col min-w-0">
        <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center justify-between px-4 lg:px-8 py-4 gap-4">
            <div className="flex items-center gap-4 flex-1">
              <div className="lg:hidden">
                <Sidebar />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full"></span>
              </Button>

              <CartDrawer />

              {/* User Dropdown */}
              <UserDropdown />
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8 overflow-y-auto max-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
