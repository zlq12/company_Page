import { ArrowUpRight, CircleCheck, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { portalModules } from "@/config/modules";

const metrics = [
  { label: "内部工具访问", value: "426", change: "+18%" },
  { label: "活跃项目", value: "18", change: "+3" },
  { label: "数据接口", value: "32", change: "稳定" },
  { label: "待上线模块", value: "5", change: "规划中" }
];

const tools = ["CRM 客户系统", "ERP 资源计划", "BI 数据看板", "OA 审批", "工单服务台", "代码仓库"];

export default function AdminPage() {
  return (
    <main className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">运营总览</h1>
        <p className="mt-2 text-sm text-muted-foreground">集中查看经营数据、内部工具入口与可挂载模块状态。</p>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.label} className="p-5">
            <div className="text-sm text-muted-foreground">{metric.label}</div>
            <div className="mt-3 flex items-end justify-between">
              <div className="text-3xl font-semibold">{metric.value}</div>
              <span className="rounded-md bg-accent px-2 py-1 text-xs font-medium text-accent-foreground">{metric.change}</span>
            </div>
          </Card>
        ))}
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold">模块挂载中心</h2>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {portalModules.map((module) => (
              <div key={module.title} className="rounded-md border p-4">
                <div className="mb-3 flex items-center justify-between">
                  <module.icon className="h-5 w-5 text-primary" />
                  <span className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">{module.status}</span>
                </div>
                <div className="font-medium">{module.title}</div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{module.description}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold">内部工具链接</h2>
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="grid gap-3">
            {tools.map((tool) => (
              <a key={tool} className="flex items-center justify-between rounded-md border p-3 text-sm transition hover:bg-muted" href="#">
                <span className="flex items-center gap-3">
                  <CircleCheck className="h-4 w-4 text-primary" />
                  {tool}
                </span>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </a>
            ))}
          </div>
        </Card>
      </section>
    </main>
  );
}
