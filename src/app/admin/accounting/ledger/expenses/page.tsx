import Link from "next/link";
import { RankingBarChart, SharePieChart, TrendChart } from "@/components/accounting/charts";
import { DeleteRecordButton } from "@/components/accounting/delete-record-button";
import { ExpenseForm } from "@/components/accounting/record-form";
import { PageHeader, Panel, StatCard } from "@/components/accounting/ui";
import type { ExpenseCategory } from "@prisma/client";
import { calculateExpenseByCategory, calculateMonthlyExpenseTrend, calculateTotalExpense } from "@/lib/accounting/calculations";
import { AccountingDatabaseNotice, isAccountingDatabaseConfigured } from "@/lib/accounting/db-status";
import { expenseCategoryLabels } from "@/lib/accounting/labels";
import { prisma } from "@/lib/accounting/prisma";
import { formatMoney } from "@/lib/accounting/utils";

export const dynamic = "force-dynamic";

export default async function ExpensesPage() {
  if (!isAccountingDatabaseConfigured()) return <AccountingDatabaseNotice />;

  const expenses = await prisma.expense.findMany({ orderBy: { date: "desc" } });
  const total = calculateTotalExpense(expenses);
  const byCategory = calculateExpenseByCategory(expenses).map((item) => ({ ...item, name: expenseCategoryLabels[item.name as ExpenseCategory] || item.name }));
  const trend = calculateMonthlyExpenseTrend(expenses);

  return (
    <div className="space-y-6">
      <PageHeader title="支出管理" description="记录经营支出，并按分类、月份和支出人查看费用结构。每笔支出都需要上传支付凭证图片。" />
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="累计总支出" value={formatMoney(total)} />
        <StatCard label="支出记录数" value={expenses.length} />
        <StatCard label="支出分类数" value={byCategory.length} />
      </div>
      <Panel title="新增支出记录">
        <ExpenseForm />
      </Panel>
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="支出分类占比">
          <SharePieChart data={byCategory} />
        </Panel>
        <Panel title="月度支出趋势">
          <TrendChart data={trend} />
        </Panel>
        <Panel title="支出分类排行" className="lg:col-span-2">
          <RankingBarChart data={byCategory} />
        </Panel>
      </div>
      <Panel title="支出明细">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-muted-foreground">
                <th className="py-2">日期</th>
                <th>分类</th>
                <th>金额</th>
                <th>支出人</th>
                <th>SKU</th>
                <th>说明</th>
                <th>凭证</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="py-2">{item.date.toISOString().slice(0, 10)}</td>
                  <td>{expenseCategoryLabels[item.category]}</td>
                  <td>{formatMoney(item.amountInBaseCurrency.toString())}</td>
                  <td>{item.payer}</td>
                  <td>{item.relatedSku}</td>
                  <td>{item.description}</td>
                  <td>
                    {item.attachmentUrl ? (
                      <Link className="text-primary" href={item.attachmentUrl} target="_blank">
                        查看凭证
                      </Link>
                    ) : (
                      <span className="text-red-600">缺少</span>
                    )}
                  </td>
                  <td>
                    <DeleteRecordButton apiPath="/api/expenses" id={item.id} label="支出" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
