import {
  BarChart3,
  Boxes,
  BriefcaseBusiness,
  Database,
  FileText,
  Link2,
  Landmark,
  Settings,
  ShieldCheck
} from "lucide-react";

export type PortalModule = {
  title: string;
  description: string;
  href: string;
  status: "active" | "planned" | "external";
  icon: React.ComponentType<{ className?: string }>;
};

export const portalModules: PortalModule[] = [
  {
    title: "经营数据",
    description: "营收、项目、交付与增长指标总览",
    href: "/admin/analytics",
    status: "active",
    icon: BarChart3
  },
  {
    title: "内部工具",
    description: "研发、销售、财务、人事系统快速入口",
    href: "/admin/tools",
    status: "active",
    icon: Link2
  },
  {
    title: "项目中心",
    description: "客户项目、里程碑与风险跟踪",
    href: "/admin/projects",
    status: "planned",
    icon: BriefcaseBusiness
  },
  {
    title: "资料库",
    description: "制度文档、合同模板与知识沉淀",
    href: "/admin/library",
    status: "planned",
    icon: FileText
  },
  {
    title: "数据集成",
    description: "ERP、CRM、工单系统与 BI 接入",
    href: "/admin/integrations",
    status: "planned",
    icon: Database
  },
  {
    title: "权限治理",
    description: "角色、组织、审计与访问策略",
    href: "/admin/security",
    status: "planned",
    icon: ShieldCheck
  },
  {
    title: "记账与数据分析",
    description: "合伙账本、费用投资、Amazon 销售导入与商品分析",
    href: "/admin/accounting",
    status: "active",
    icon: Landmark
  },
  {
    title: "模块市场",
    description: "按业务线挂载新的功能模块",
    href: "/admin/modules",
    status: "active",
    icon: Boxes
  },
  {
    title: "系统设置",
    description: "站点信息、导航、主题与基础配置",
    href: "/admin/settings",
    status: "planned",
    icon: Settings
  }
];
