import { existsSync, readFileSync } from "node:fs";

const envPath = ".env";

if (!existsSync(envPath)) {
  console.error("DATABASE_URL 未配置：请在总站根目录创建 .env。");
  console.error("可参考 .env.accounting.example，填入 PostgreSQL 连接字符串后再运行 npm run db:push。");
  process.exit(1);
}

const envText = readFileSync(envPath, "utf8");
const hasDatabaseUrl = /^DATABASE_URL\s*=\s*.+/m.test(envText);

if (!hasDatabaseUrl) {
  console.error("DATABASE_URL 未配置：.env 中没有 DATABASE_URL。");
  console.error('示例：DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?sslmode=require"');
  process.exit(1);
}
