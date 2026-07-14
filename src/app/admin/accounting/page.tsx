import Link from "next/link";
import { BarChart3, Landmark } from "lucide-react";
import { Card } from "@/components/ui/card";

const accountingModules = [
  {
    title: "合伙记账",
    description: "管理合伙人投资、垫付、还款、分红、提现和日常经营支出。",
    href: "/admin/accounting/ledger",
    icon: Landmark,
    links: [
      { title: "投资管理", href: "/admin/accounting/ledger/investments" },
      { title: "支出管理", href: "/admin/accounting/ledger/expenses" }
    ]
  },
  {
    title: "销售数据分析",
    description: "导入 Amazon / 领星等报表，完成字段映射、销售汇总和商品排行。",
    href: "/admin/accounting/analytics",
    icon: BarChart3,
    links: [
      { title: "数据导入", href: "/admin/accounting/analytics/imports" },
      { title: "销售看板", href: "/admin/accounting/analytics/sales" },
      { title: "商品管理", href: "/admin/accounting/analytics/products" }
    ]
  }
];

export default function AccountingPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">记账与数据分析</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        从独立工具挂载到总站的业务模块，覆盖合伙账本、经营支出、报表导入和销售分析。
      </p>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {accountingModules.map((module) => (
          <Card key={module.title} className="p-5">
            <module.icon className="h-6 w-6 text-primary" />
            <h2 className="mt-4 text-lg font-semibold">{module.title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{module.description}</p>
            <div className="mt-5 grid gap-2">
              <Link href={module.href} className="rounded-md border px-3 py-2 text-sm font-medium hover:bg-muted">
                进入{module.title}
              </Link>
              {module.links.map((link) => (
                <Link key={link.href} href={link.href} className="rounded-md border px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground">
                  {link.title}
                </Link>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
}
