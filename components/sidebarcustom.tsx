"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "@react-hook/media-query";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger,
} from "@/components/ui/sheet";
import { House, LogOut, Settings, User, Menu } from "lucide-react";

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;
type NavItem = { name: string; href: string; icon: IconType };

const items: NavItem[] = [
  { name: "Home", href: "/", icon: House },
  { name: "Profile", href: "/profile", icon: User },
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Logout", href: "/logout", icon: LogOut },
];

type ResponsiveSidebarProps = {
  /** Control the mobile sheet externally */
  mobileOpen?: boolean;
  onMobileOpenChange?: (open: boolean) => void;
};

export function ResponsiveSidebar({
  mobileOpen,
  onMobileOpenChange,
}: ResponsiveSidebarProps) {
  // internal state (used only when uncontrolled)
  const [internalOpen, setInternalOpen] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const pathname = usePathname();

  const isControlled = mobileOpen !== undefined;
  const open = isControlled ? !!mobileOpen : internalOpen;
  const setOpen = React.useCallback(
    (v: boolean) => (isControlled ? onMobileOpenChange?.(v) : setInternalOpen(v)),
    [isControlled, onMobileOpenChange]
  );

  const NavList = ({ onNavigate }: { onNavigate?: () => void }) => (
    <nav className="flex flex-col gap-1 px-2">
      {items.map((item) => {
        const active = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.name}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-gray-700/60",
              active && "bg-gray-700/70 text-white"
            )}
          >
            <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
            {!collapsed && (
              <motion.span
                initial={false}
                animate={{ opacity: collapsed ? 0 : 1, scaleX: collapsed ? 0.98 : 1 }}
                style={{ originX: 0 }}
                transition={{ duration: 11 }}
                className={cn("truncate", collapsed && "pointer-events-none")}
              >
                {item.name}
              </motion.span>
            )}
          </Link>
        );
      })}
    </nav>
  );

  if (isDesktop) {
    return (
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 64 : 224 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="h-[100dvh] sticky top-0 border-r border-white/10 flex flex-col py-4 overflow-hidden"
      >
        <div className="px-2 pb-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed((c) => !c)}
            className="rounded-lg w-10 h-10"
            aria-label={collapsed ? "Expand menu" : "Collapse menu"}
            title={collapsed ? "Expand" : "Collapse"}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        <NavList />
      </motion.aside>
    );
  }

  // Mobile: left sheet (uses controlled props if provided)
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* You can still render a local trigger if you want */}
      <SheetTrigger asChild>
        <Button variant="outline" className="absolute top-9 left-11" size="icon" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-72 sm:w-80 p-0">
        <SheetHeader className="px-4 py-4">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="pb-2">
          <NavList onNavigate={() => setOpen(false)} />
        </div>
        <SheetFooter className="px-4 py-3">
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
