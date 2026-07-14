import { monthKey } from "@/lib/accounting/utils";

type MoneyRecord = {
  amountInBaseCurrency: unknown;
  type?: string;
  partnerName?: string | null;
  date: Date | string;
};

type ExpenseRecord = MoneyRecord & {
  category?: string | null;
};

type SalesRecord = {
  date: Date | string;
  productName: string;
  sku: string;
  childProductName?: string | null;
  quantity: number;
  grossSales: unknown;
  refundAmount: unknown;
  netSales: unknown;
  orderId?: string | null;
};

const n = (value: unknown) => Number(value || 0);

export function calculateRealInvestment(investments: MoneyRecord[]) {
  return investments.filter((item) => item.type === "initial_investment").reduce((sum, item) => sum + n(item.amountInBaseCurrency), 0);
}

export function calculateReturnInvestment(investments: MoneyRecord[]) {
  return investments
    .filter((item) => item.type === "additional_investment" || item.type === "advance_payment")
    .reduce((sum, item) => sum + n(item.amountInBaseCurrency), 0);
}

export function calculateTotalInvestment(investments: MoneyRecord[]) {
  return investments.reduce((sum, item) => sum + n(item.amountInBaseCurrency), 0);
}

export function calculatePartnerBalance(investments: MoneyRecord[]) {
  const map = new Map<string, { partnerName: string; initialInvestment: number; returnInvestment: number; totalInvestment: number; net: number }>();
  for (const item of investments) {
    const partnerName = item.partnerName || "未指定";
    const row = map.get(partnerName) || { partnerName, initialInvestment: 0, returnInvestment: 0, totalInvestment: 0, net: 0 };
    const amount = n(item.amountInBaseCurrency);
    if (item.type === "initial_investment") row.initialInvestment += amount;
    if (item.type === "additional_investment" || item.type === "advance_payment") row.returnInvestment += amount;
    row.totalInvestment += amount;
    row.net += amount;
    map.set(partnerName, row);
  }
  return Array.from(map.values());
}

export function calculateTotalExpense(expenses: ExpenseRecord[]) {
  return expenses.reduce((sum, item) => sum + n(item.amountInBaseCurrency), 0);
}

export function calculateExpenseByCategory(expenses: ExpenseRecord[]) {
  return groupMoney(expenses, "category").sort((a, b) => b.amount - a.amount);
}

export function calculateMonthlyExpenseTrend(expenses: ExpenseRecord[]) {
  const map = new Map<string, { month: string; amount: number }>();
  for (const item of expenses) {
    const month = monthKey(item.date);
    const row = map.get(month) || { month, amount: 0 };
    row.amount += n(item.amountInBaseCurrency);
    map.set(month, row);
  }
  return Array.from(map.values()).sort((a, b) => a.month.localeCompare(b.month));
}

export function calculateSalesSummary(records: SalesRecord[]) {
  const orderIds = new Set(records.map((item) => item.orderId).filter(Boolean));
  const skus = new Set(records.map((item) => item.sku).filter(Boolean));
  const grossSales = records.reduce((sum, item) => sum + n(item.grossSales), 0);
  const refundAmount = records.reduce((sum, item) => sum + n(item.refundAmount), 0);
  const netSales = records.reduce((sum, item) => sum + n(item.netSales), 0);
  const quantity = records.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
  return {
    grossSales,
    refundAmount,
    netSales,
    quantity,
    orderCount: orderIds.size || records.length,
    skuCount: skus.size,
    averageSellingPrice: quantity ? netSales / quantity : 0
  };
}

export function calculateMonthlySalesTrend(records: SalesRecord[]) {
  const map = new Map<string, { month: string; grossSales: number; refundAmount: number; netSales: number; quantity: number }>();
  for (const item of records) {
    const month = monthKey(item.date);
    const row = map.get(month) || { month, grossSales: 0, refundAmount: 0, netSales: 0, quantity: 0 };
    row.grossSales += n(item.grossSales);
    row.refundAmount += n(item.refundAmount);
    row.netSales += n(item.netSales);
    row.quantity += Number(item.quantity || 0);
    map.set(month, row);
  }
  return Array.from(map.values()).sort((a, b) => a.month.localeCompare(b.month));
}

export function calculateProductSalesRanking(records: SalesRecord[]) {
  return groupSales(records, (item) => item.productName || item.sku).sort((a, b) => b.netSales - a.netSales);
}

export function calculateSkuSalesRanking(records: SalesRecord[]) {
  return groupSales(records, (item) => item.sku).sort((a, b) => b.quantity - a.quantity);
}

export function calculateChildProductShare(records: SalesRecord[]) {
  return groupSales(records, (item) => item.childProductName || item.productName || item.sku).sort((a, b) => b.netSales - a.netSales);
}

function groupMoney<T extends MoneyRecord>(records: T[], field: keyof T) {
  const map = new Map<string, { name: string; amount: number }>();
  for (const item of records) {
    const name = String(item[field] || "未分类");
    const row = map.get(name) || { name, amount: 0 };
    row.amount += n(item.amountInBaseCurrency);
    map.set(name, row);
  }
  return Array.from(map.values());
}

function groupSales(records: SalesRecord[], getName: (record: SalesRecord) => string) {
  const map = new Map<string, { name: string; grossSales: number; refundAmount: number; netSales: number; quantity: number }>();
  for (const item of records) {
    const name = getName(item) || "未命名";
    const row = map.get(name) || { name, grossSales: 0, refundAmount: 0, netSales: 0, quantity: 0 };
    row.grossSales += n(item.grossSales);
    row.refundAmount += n(item.refundAmount);
    row.netSales += n(item.netSales);
    row.quantity += Number(item.quantity || 0);
    map.set(name, row);
  }
  return Array.from(map.values());
}
