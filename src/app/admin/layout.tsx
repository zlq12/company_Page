import Link from "next/link";
import { Building2, Home, Search } from "lucide-react";
import { portalModules } from "@/config/modules";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r bg-card px-4 py-5 lg:block">
        <Link href="/admin" className="mb-4 flex items-center gap-3 px-2 font-semibold">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground">
            <Building2 className="h-5 w-5" />
          </span>
          瑞祺腾炟管理门户
        </Link>
        <Link
          href="/"
          className="mb-6 flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-foreground transition hover:bg-muted"
        >
          <Home className="h-4 w-4" />
          公司首页
        </Link>
        <nav className="grid gap-1">
          {portalModules.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="lg:pl-72">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/95 px-6 backdrop-blur">
          <div className="flex h-10 w-full max-w-md items-center gap-2 rounded-md border bg-card px-3 text-sm text-muted-foreground">
            <Search className="h-4 w-4" />
            搜索工具、模块、数据指标
          </div>
          <div className="ml-4 text-sm font-medium">管理员</div>
        </header>
        {children}
      </div>
    </div>
  );
}
