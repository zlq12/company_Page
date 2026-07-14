# 瑞祺腾炟科技企业门户

参考 `Kiranism/next-shadcn-dashboard-starter` 设计思路搭建的公司官网与内部后台原型。

## 功能

- 公司主页：品牌展示、解决方案、平台能力说明。
- 管理员登录：演示登录后进入内部后台。
- 后台仪表盘：经营数据、内部工具链接、模块挂载中心。
- 记账与数据分析：挂载 `C:\Users\dell\Documents\记账&数据分析` 工具的合伙记账、支出、投资、销售、商品和导入批次页面。
- 模块配置：通过 `src/config/modules.ts` 统一注册菜单、路由、图标和状态。

## 开发

```bash
npm install
npm run db:generate
npm run dev
```

如需启用记账与数据分析模块的数据读写，请根据 `.env.accounting.example` 配置 `DATABASE_URL`，然后执行：

```bash
npm run db:push
npm run db:seed
```

访问 `http://localhost:3000`。
