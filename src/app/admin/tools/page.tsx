import { ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";

const groups = [
  { name: "经营管理", tools: ["CRM 客户系统", "ERP 资源计划", "BI 数据看板"] },
  { name: "协同办公", tools: ["OA 审批", "合同归档", "会议室预约"] },
  { name: "技术研发", tools: ["代码仓库", "CI/CD 平台", "接口文档"] }
];

export default function ToolsPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">内部工具</h1>
      <p className="mt-2 text-sm text-muted-foreground">按部门和业务场景维护外部系统链接。</p>
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {groups.map((group) => (
          <Card key={group.name} className="p-5">
            <h2 className="font-semibold">{group.name}</h2>
            <div className="mt-4 grid gap-3">
              {group.tools.map((tool) => (
                <a key={tool} href="#" className="flex items-center justify-between rounded-md border p-3 text-sm hover:bg-muted">
                  {tool}
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </a>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
}
