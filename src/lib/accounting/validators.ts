import { z } from "zod";

const currencySchema = z.enum(["CNY", "USD"]);

export const investmentSchema = z.object({
  partnerName: z.string().min(1, "请填写合伙人"),
  type: z.enum(["initial_investment", "additional_investment", "advance_payment", "loan", "repayment", "dividend", "withdrawal"]),
  amount: z.coerce.number().positive("金额必须大于 0"),
  currency: currencySchema,
  exchangeRate: z.coerce.number().positive().optional().or(z.literal("")),
  date: z.coerce.date(),
  purpose: z.string().optional(),
  relatedExpenseId: z.string().optional(),
  note: z.string().optional()
});

export const expenseSchema = z.object({
  date: z.coerce.date(),
  category: z.enum([
    "product_purchase",
    "first_leg_shipping",
    "amazon_fee",
    "fba_fee",
    "storage_fee",
    "advertising",
    "software",
    "sample",
    "packaging",
    "photography",
    "inspection",
    "customs",
    "refund_loss",
    "partner_repayment",
    "dividend",
    "other"
  ]),
  subCategory: z.string().optional(),
  amount: z.coerce.number().positive("金额必须大于 0"),
  currency: currencySchema,
  exchangeRate: z.coerce.number().positive().optional().or(z.literal("")),
  paymentAccount: z.string().optional(),
  payer: z.string().min(1, "请填写支出人"),
  relatedPartner: z.string().optional(),
  relatedStore: z.string().optional(),
  relatedMarketplace: z.string().optional(),
  relatedSku: z.string().optional(),
  relatedAsin: z.string().optional(),
  relatedBatchNo: z.string().optional(),
  supplier: z.string().optional(),
  description: z.string().min(1, "请填写支出说明"),
  note: z.string().optional()
});

export function amountInBaseCurrency(amount: number, currency: "CNY" | "USD", exchangeRate?: number | string) {
  if (currency === "CNY") return amount;
  const rate = typeof exchangeRate === "string" ? Number(exchangeRate) : exchangeRate;
  if (!rate || Number.isNaN(rate)) {
    throw new Error("美元金额需要填写有效汇率");
  }
  return amount * rate;
}
