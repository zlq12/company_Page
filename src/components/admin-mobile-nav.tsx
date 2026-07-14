"use client";

import Link from "next/link";
import { useState } from "react";
import { Building2, Home, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { portalModules } from "@/config/modules";

export function AdminMobileNav() {
  const [open, setOpen] = useState(false);

  function close() {
    setOpen(false);
  }

  return (
    <div className="lg:hidden">
      <Button
        type="button"
        variant="secondary"
        className="h-10 w-10 px-0"
        onClick={() => setOpen(true)}
        aria-label="打开后台菜单"
      >
        <Menu className="h-5 w-5" />
      </Button>
      {open ? (
        <div className="fixed inset-0 z-50">
          <button className="absolute inset-0 z-0 bg-foreground/30" type="button" aria-label="关闭后台菜单" onClick={close} />
          <aside className="absolute inset-y-0 left-0 z-10 w-80 max-w-[86vw] overflow-y-auto border-r bg-card px-4 py-5 shadow-soft">
            <div className="mb-4 flex items-center justify-between">
              <Link href="/admin" className="flex items-center gap-3 font-semibold" onClick={close}>
                <span className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground">
                  <Building2 className="h-5 w-5" />
                </span>
                瑞祺腾炟管理门户
              </Link>
              <Button type="button" variant="ghost" className="h-9 w-9 px-0" onClick={close} aria-label="关闭后台菜单">
                <X className="h-5 w-5" />
              </Button>
            </div>
            <Link href="/" onClick={close} className="mb-4 flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted">
              <Home className="h-4 w-4" />
              公司首页
            </Link>
            <nav className="grid gap-1">
              {portalModules.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={close}
                  className="flex items-center gap-3 rounded-md px-3 py-3 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Link>
              ))}
            </nav>
          </aside>
        </div>
      ) : null}
    </div>
  );
}
