import Link from "next/link";
import { PageHeader, Panel, StatCard } from "@/components/accounting/ui";
import { calculateTotalExpense, calculateTotalInvestment } from "@/lib/accounting/calculations";
import { AccountingDatabaseNotice, isAccountingDatabaseConfigured } from "@/lib/accounting/db-status";
import { prisma } from "@/lib/accounting/prisma";
import { formatMoney } from "@/lib/accounting/utils";

export const dynamic = "force-dynamic";

export default async function LedgerModulePage() {
  if (!isAccountingDatabaseConfigured()) return <AccountingDatabaseNotice />;

  const [investments, expenses] = await Promise.all([
    prisma.investment.findMany(),
    prisma.expense.findMany()
  ]);
  const totalInvestment = calculateTotalInvestment(investments);
  const totalExpense = calculateTotalExpense(expenses);
  const cashFlow = totalInvestment - totalExpense;

  return (
    <div className="space-y-6">
      <PageHeader title="合伙记账模块" description="管理投资、垫付、还款、分红和支出，并集中查看当前资金状态。" />
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="当前总投入" value={formatMoney(totalInvestment)} hint={`共 ${investments.length} 条资金记录`} />
        <StatCard label="当前总支出" value={formatMoney(totalExpense)} hint={`共 ${expenses.length} 条支出记录`} />
        <StatCard label="当前现金流" value={formatMoney(cashFlow)} hint="总投入 - 总支出" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Panel title="投资管理">
          <p className="mb-4 text-sm text-muted-foreground">记录合伙人的初始投资、追加投资、垫付、借款、还款、分红和提现。</p>
          <Link className="text-sm font-medium text-primary" href="/admin/accounting/ledger/investments">
            进入投资管理
          </Link>
        </Panel>
        <Panel title="支出管理">
          <p className="mb-4 text-sm text-muted-foreground">按采购、物流、广告、FBA、软件等分类记录每一笔经营支出。</p>
          <Link className="text-sm font-medium text-primary" href="/admin/accounting/ledger/expenses">
            进入支出管理
          </Link>
        </Panel>
      </div>
    </div>
  );
}
