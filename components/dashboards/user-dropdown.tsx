"use client";

import { deleteCookie } from "cookies-next";
import {
  ArrowDownIcon,
  ChevronsUpDown,
  LogOut,
  ShoppingBag,
  User,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthToken } from "@/hooks/use-auth-token";
import { Button } from "../ui/button";

export function UserDropdown() {
  const { payload } = useAuthToken();

  const logout = () => {
    deleteCookie("accessToken"); // 🔥 proper delete
    localStorage.removeItem("token"); // (optional) JWT storage cleanup
    window.location.href = "/login";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="gap-2 px-2">
          <div className="hidden md:flex text-left items-center gap-2">
            <p className="text-xs text-muted-foreground">{payload?.email}</p>
            <ChevronsUpDown />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <ShoppingBag className="mr-2 h-4 w-4" />
          <span>Orders</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="text-destructive" onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
