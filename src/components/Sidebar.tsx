"use client";

import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function Sidebar({ open, setOpen }: SidebarProps) {
  const { t } = useTranslation();

  // Close sidebar when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setOpen]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="left" className="w-[240px] sm:w-[300px] p-0">
        <SheetHeader className="p-4 text-left border-b">
          <SheetTitle className="flex items-center justify-between">
            <span>TypeCalc Menu</span>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </SheetTitle>
        </SheetHeader>

        <div className="py-4">
          <nav className="flex flex-col space-y-1 px-2">
            <NavLink
              to="/offense/"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`
              }
            >
              {t("navigation.offense")}
            </NavLink>
            <NavLink
              to="/defense/"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`
              }
            >
              {t("navigation.defense")}
            </NavLink>
            <NavLink
              to="/pokedex/"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`
              }
            >
              {t("navigation.pokedex")}
            </NavLink>
          </nav>

          <Separator className="my-4" />

          <div className="px-4 py-2">
            <h3 className="mb-2 text-sm font-medium">Settings</h3>
            <div className="space-y-3">
              {/* Mobile settings controls can go here */}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
