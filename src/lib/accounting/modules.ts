import { BarChart3, Landmark } from "lucide-react";

export const businessModules = [
  {
    key: "ledger",
    name: "合伙记账",
    description: "管理合伙人投资、垫付、还款、分红和日常支出。",
    href: "/admin/accounting/ledger",
    icon: Landmark,
    links: [
      { name: "投资管理", href: "/admin/accounting/ledger/investments" },
      { name: "支出管理", href: "/admin/accounting/ledger/expenses" }
    ]
  },
  {
    key: "sales",
    name: "销售分析",
    description: "导入 Amazon / 领星报表，完成字段映射、销售汇总和产品排行。",
    href: "/admin/accounting/analytics",
    icon: BarChart3,
    links: [
      { name: "数据导入", href: "/admin/accounting/analytics/imports" },
      { name: "销售看板", href: "/admin/accounting/analytics/sales" },
      { name: "产品管理", href: "/admin/accounting/analytics/products" }
    ]
  }
];
