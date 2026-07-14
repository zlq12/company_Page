import Link from "next/link";
import { Building2, Home, Menu } from "lucide-react";
import { portalModules } from "@/config/modules";

export function AdminMobileNav() {
  return (
    <details className="relative lg:hidden">
      <summary
        className="inline-flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-md border bg-card text-foreground transition hover:bg-muted [&::-webkit-details-marker]:hidden"
        aria-label="打开后台菜单"
      >
        <Menu className="h-5 w-5" />
      </summary>
      <div className="fixed inset-x-3 top-16 z-50 max-h-[calc(100vh-5rem)] overflow-y-auto rounded-lg border bg-card p-4 shadow-soft">
        <Link href="/admin" className="mb-4 flex items-center gap-3 font-semibold">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground">
            <Building2 className="h-5 w-5" />
          </span>
          瑞祺腾炟管理门户
        </Link>
        <Link href="/" className="mb-3 flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted">
          <Home className="h-4 w-4" />
          公司首页
        </Link>
        <nav className="grid gap-1">
          {portalModules.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="flex items-center gap-3 rounded-md px-3 py-3 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </details>
  );
}
