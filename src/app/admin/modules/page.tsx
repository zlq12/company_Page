import { Card } from "@/components/ui/card";
import { portalModules } from "@/config/modules";

export default function ModulesPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">模块市场</h1>
      <p className="mt-2 text-sm text-muted-foreground">每个模块由配置注册，便于后续按业务线挂载路由、菜单和权限。</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {portalModules.map((module) => (
          <Card key={module.title} className="p-5">
            <module.icon className="h-6 w-6 text-primary" />
            <h2 className="mt-4 font-semibold">{module.title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{module.description}</p>
            <div className="mt-4 rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">{module.status}</div>
          </Card>
        ))}
      </div>
    </main>
  );
}
