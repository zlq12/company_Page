import type { ExpenseCategory, ImportSource, InvestmentType } from "@prisma/client";

export const investmentTypeLabels: Record<InvestmentType, string> = {
  initial_investment: "初始投资",
  additional_investment: "追加投资",
  advance_payment: "垫付",
  loan: "借款",
  repayment: "还款",
  dividend: "分红",
  withdrawal: "提现"
};

export const activeInvestmentTypes: InvestmentType[] = [
  "initial_investment",
  "additional_investment",
  "advance_payment",
  "loan",
  "repayment",
  "dividend",
  "withdrawal"
];

export const expenseCategoryLabels: Record<ExpenseCategory, string> = {
  product_purchase: "产品采购",
  first_leg_shipping: "头程物流",
  amazon_fee: "Amazon 费用",
  fba_fee: "FBA 费用",
  storage_fee: "仓储费",
  advertising: "广告费",
  software: "软件服务",
  sample: "样品",
  packaging: "包装",
  photography: "拍摄",
  inspection: "验货",
  customs: "关税清关",
  refund_loss: "退款损失",
  partner_repayment: "合伙人还款",
  dividend: "分红",
  other: "其他"
};

export const importSourceLabels: Record<ImportSource, string> = {
  amazon_seller_central: "Amazon Seller Central",
  amazon_advertising: "Amazon Advertising",
  lingxing_erp: "领星 ERP",
  manual_template: "手工模板",
  unknown: "未知来源"
};
