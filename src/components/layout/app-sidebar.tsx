import type { ComponentType, SVGProps } from "react";
import {
  Bell,
  Boxes,
  CreditCard,
  FileText,
  LayoutDashboard,
  LogIn,
  Table2,
  User,
  UserPlus,
} from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

function NavItem({
  icon: Icon,
  label,
  active = false,
}: {
  icon: IconType;
  label: string;
  active?: boolean;
}) {
  if (active) {
    return (
      <a
        href="#"
        aria-current="page"
        className="flex h-9 w-full items-center gap-3 rounded-lg bg-brand-ink px-3 text-sm text-white"
      >
        <Icon className="size-4" aria-hidden="true" />
        {label}
      </a>
    );
  }

  return (
    <a
      href="#"
      className="flex h-9 items-center gap-3 rounded-lg px-3 text-sm text-brand-body transition-colors hover:bg-muted hover:text-brand-title"
    >
      <Icon className="size-4" aria-hidden="true" />
      {label}
    </a>
  );
}

export function AppSidebar({ className }: { className?: string }) {
  return (
    <div className={cn("flex h-full flex-col gap-1 px-3 py-4", className)}>
      <div className="mb-4 flex items-center gap-2">
        <span className="flex size-7 items-center justify-center rounded-md bg-brand-ink">
          <Boxes className="size-4 text-white" aria-hidden="true" />
        </span>
        <span className="text-base font-semibold text-brand-title">
          Material Shadcn
        </span>
      </div>

      <nav aria-label="Main" className="flex flex-col gap-1">
        <NavItem icon={LayoutDashboard} label="Dashboard" active />
        <NavItem icon={User} label="Profile" />
        <NavItem icon={Table2} label="Tables" />
        <NavItem icon={Bell} label="Notifications" />
        <NavItem icon={CreditCard} label="Subscriptions" />
      </nav>

      <Separator className="my-3" />

      <p className="mb-1 px-3 text-xs font-semibold uppercase tracking-wider text-brand-body/70">
        Auth Pages
      </p>
      <div className="flex flex-col gap-1">
        <NavItem icon={LogIn} label="Sign In" />
        <NavItem icon={UserPlus} label="Sign Up" />
      </div>

      <Separator className="my-3" />

      <NavItem icon={FileText} label="Documentation" />
    </div>
  );
}
