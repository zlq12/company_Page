import Link from "next/link";
import { ArrowRight, Building2, DatabaseZap, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const highlights = [
  { title: "产业数字化方案", text: "从业务流程、数据采集到管理看板，帮助组织把复杂协作变得可视、可控。" },
  { title: "内部工具统一入口", text: "管理员登录后可集中访问工具链接、数据报表和后续挂载模块。" },
  { title: "可扩展门户架构", text: "首页、权限、导航和功能模块分层设计，适合持续叠加业务能力。" }
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-3 font-semibold">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground">
            <Building2 className="h-5 w-5" />
          </span>
          瑞祺腾炟科技
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#solutions">解决方案</a>
          <a href="#platform">平台能力</a>
          <a href="#contact">联系</a>
        </nav>
        <Link href="/login">
          <Button variant="secondary">管理员登录</Button>
        </Link>
      </header>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 pb-16 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p className="mb-5 inline-flex rounded-md border bg-card px-3 py-1 text-sm text-muted-foreground">
            企业官网 + 内部管理门户
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-normal text-foreground md:text-6xl">
            瑞祺腾炟科技数字化运营平台
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            对外展示公司能力，对内承载工具入口、经营数据和模块化业务应用。一个入口连接官网品牌、后台管理和持续扩展的业务系统。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/login">
              <Button>
                进入管理后台
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <a href="#platform">
              <Button variant="secondary">查看平台设计</Button>
            </a>
          </div>
        </div>
        <div className="rounded-lg border bg-card p-5 shadow-soft">
          <div className="grid gap-4">
            <div className="rounded-md bg-muted p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">本月运营概览</span>
                <DatabaseZap className="h-4 w-4 text-primary" />
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3">
                {["项目交付", "工具访问", "数据接口"].map((item, index) => (
                  <div key={item} className="rounded-md bg-card p-3">
                    <div className="text-2xl font-semibold">{[18, 426, 32][index]}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{item}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {["CRM 客户系统", "ERP 资源计划", "BI 数据看板", "工单服务台"].map((tool) => (
                <div key={tool} className="flex items-center gap-3 rounded-md border p-3 text-sm">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  {tool}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="solutions" className="border-y bg-card">
        <div className="mx-auto grid max-w-7xl gap-4 px-6 py-14 md:grid-cols-3">
          {highlights.map((item) => (
            <article key={item.title} className="rounded-lg border bg-background p-6">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="platform" className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="text-3xl font-semibold">后台按模块挂载</h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              参考 shadcn dashboard 的功能式目录与侧边栏布局，新增模块只需要注册名称、图标、路由、权限与数据源，就能纳入统一门户。
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {["统一认证", "角色权限", "数据卡片", "工具链接", "模块市场", "审计日志"].map((item) => (
              <div key={item} className="rounded-md border bg-card p-4 text-sm font-medium">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
