"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Currency = "CNY" | "USD";

type ExpenseRecord = {
  id: string;
  date: string;
  category: string;
  amount: string;
  currency: Currency;
  exchangeRate?: string | null;
  amountInBaseCurrency: string;
  payer: string;
  description: string;
  subCategory?: string | null;
  paymentAccount?: string | null;
  relatedPartner?: string | null;
  relatedStore?: string | null;
  relatedMarketplace?: string | null;
  relatedSku?: string | null;
  relatedAsin?: string | null;
  relatedBatchNo?: string | null;
  supplier?: string | null;
  note?: string | null;
  attachmentUrl?: string | null;
};

type InvestmentRecord = {
  id: string;
  partnerName: string;
  type: string;
  amount: string;
  currency: Currency;
  exchangeRate?: string | null;
  amountInBaseCurrency: string;
  date: string;
  purpose?: string | null;
  relatedExpenseId?: string | null;
  note?: string | null;
  attachmentUrl?: string | null;
};

const expenseCategories = [
  ["product_purchase", "产品采购"],
  ["first_leg_shipping", "头程物流"],
  ["amazon_fee", "Amazon 费用"],
  ["fba_fee", "FBA 费用"],
  ["storage_fee", "仓储费"],
  ["advertising", "广告费"],
  ["software", "软件服务"],
  ["sample", "样品"],
  ["packaging", "包装"],
  ["photography", "拍摄"],
  ["inspection", "验货"],
  ["customs", "关税清关"],
  ["refund_loss", "退款损失"],
  ["partner_repayment", "合伙人还款"],
  ["dividend", "分红"],
  ["other", "其他"]
];

const investmentTypes = [
  ["initial_investment", "初始投资"],
  ["additional_investment", "追加投资"],
  ["advance_payment", "垫付"],
  ["loan", "借款"],
  ["repayment", "还款"],
  ["dividend", "分红"],
  ["withdrawal", "提现"]
];

function today() {
  return new Date().toISOString().slice(0, 10);
}

function baseAmount(amount: string, currency: Currency, exchangeRate?: string) {
  const raw = Number(amount || 0);
  const rate = currency === "USD" ? Number(exchangeRate || 0) : 1;
  return currency === "USD" ? raw * rate : raw;
}

function inputClass() {
  return "h-9 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring";
}

function selectClass() {
  return "h-9 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring";
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2 text-sm font-medium">
      {label}
      {children}
    </label>
  );
}

export function ExpenseCrud({ records }: { records: ExpenseRecord[] }) {
  const router = useRouter();
  const [editing, setEditing] = useState<ExpenseRecord | null>(null);
  const [form, setForm] = useState({
    date: today(),
    category: "product_purchase",
    amount: "",
    currency: "CNY" as Currency,
    exchangeRate: "",
    payer: "",
    description: "",
    subCategory: "",
    paymentAccount: "",
    relatedPartner: "",
    relatedStore: "",
    relatedMarketplace: "",
    relatedSku: "",
    relatedAsin: "",
    relatedBatchNo: "",
    supplier: "",
    note: "",
    attachmentUrl: ""
  });
  const amountInBaseCurrency = useMemo(() => baseAmount(form.amount, form.currency, form.exchangeRate), [form.amount, form.currency, form.exchangeRate]);

  function startEdit(record: ExpenseRecord) {
    setEditing(record);
    setForm({
      date: record.date,
      category: record.category,
      amount: record.amount,
      currency: record.currency,
      exchangeRate: record.exchangeRate || "",
      payer: record.payer,
      description: record.description,
      subCategory: record.subCategory || "",
      paymentAccount: record.paymentAccount || "",
      relatedPartner: record.relatedPartner || "",
      relatedStore: record.relatedStore || "",
      relatedMarketplace: record.relatedMarketplace || "",
      relatedSku: record.relatedSku || "",
      relatedAsin: record.relatedAsin || "",
      relatedBatchNo: record.relatedBatchNo || "",
      supplier: record.supplier || "",
      note: record.note || "",
      attachmentUrl: record.attachmentUrl || ""
    });
  }

  function reset() {
    setEditing(null);
    setForm({
      date: today(),
      category: "product_purchase",
      amount: "",
      currency: "CNY",
      exchangeRate: "",
      payer: "",
      description: "",
      subCategory: "",
      paymentAccount: "",
      relatedPartner: "",
      relatedStore: "",
      relatedMarketplace: "",
      relatedSku: "",
      relatedAsin: "",
      relatedBatchNo: "",
      supplier: "",
      note: "",
      attachmentUrl: ""
    });
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    const payload = { ...form, amountInBaseCurrency };
    const response = await fetch("/api/expenses", {
      method: editing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing ? { id: editing.id, ...payload } : payload)
    });
    if (!response.ok) alert((await response.json()).error || "保存失败");
    reset();
    router.refresh();
  }

  async function remove(id: string) {
    if (!confirm("确认删除这条支出记录？")) return;
    const response = await fetch(`/api/expenses?id=${id}`, { method: "DELETE" });
    if (!response.ok) alert((await response.json()).error || "删除失败");
    router.refresh();
  }

  return (
    <div className="mt-6 grid gap-6">
      <Card className="p-5">
        <h2 className="font-semibold">{editing ? "编辑支出" : "新增支出"}</h2>
        <form className="mt-4 grid gap-4 lg:grid-cols-4" onSubmit={submit}>
          <Field label="日期"><input className={inputClass()} type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required /></Field>
          <Field label="分类"><select className={selectClass()} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>{expenseCategories.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></Field>
          <Field label="金额"><input className={inputClass()} type="number" step="0.01" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} required /></Field>
          <Field label="币种"><select className={selectClass()} value={form.currency} onChange={(e) => setForm({ ...form, currency: e.target.value as Currency })}><option value="CNY">CNY</option><option value="USD">USD</option></select></Field>
          <Field label="汇率"><input className={inputClass()} type="number" step="0.000001" value={form.exchangeRate} onChange={(e) => setForm({ ...form, exchangeRate: e.target.value })} placeholder="USD 时填写" /></Field>
          <Field label="付款人"><input className={inputClass()} value={form.payer} onChange={(e) => setForm({ ...form, payer: e.target.value })} required /></Field>
          <Field label="说明"><input className={inputClass()} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required /></Field>
          <Field label="子分类"><input className={inputClass()} value={form.subCategory} onChange={(e) => setForm({ ...form, subCategory: e.target.value })} /></Field>
          <Field label="付款账户"><input className={inputClass()} value={form.paymentAccount} onChange={(e) => setForm({ ...form, paymentAccount: e.target.value })} /></Field>
          <Field label="关联合伙人"><input className={inputClass()} value={form.relatedPartner} onChange={(e) => setForm({ ...form, relatedPartner: e.target.value })} /></Field>
          <Field label="店铺"><input className={inputClass()} value={form.relatedStore} onChange={(e) => setForm({ ...form, relatedStore: e.target.value })} /></Field>
          <Field label="站点"><input className={inputClass()} value={form.relatedMarketplace} onChange={(e) => setForm({ ...form, relatedMarketplace: e.target.value })} /></Field>
          <Field label="SKU"><input className={inputClass()} value={form.relatedSku} onChange={(e) => setForm({ ...form, relatedSku: e.target.value })} /></Field>
          <Field label="ASIN"><input className={inputClass()} value={form.relatedAsin} onChange={(e) => setForm({ ...form, relatedAsin: e.target.value })} /></Field>
          <Field label="批次号"><input className={inputClass()} value={form.relatedBatchNo} onChange={(e) => setForm({ ...form, relatedBatchNo: e.target.value })} /></Field>
          <Field label="供应商"><input className={inputClass()} value={form.supplier} onChange={(e) => setForm({ ...form, supplier: e.target.value })} /></Field>
          <Field label="凭证链接"><input className={inputClass()} value={form.attachmentUrl} onChange={(e) => setForm({ ...form, attachmentUrl: e.target.value })} /></Field>
          <Field label="备注"><input className={inputClass()} value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} /></Field>
          <div className="flex items-end gap-2">
            <Button type="submit">{editing ? "保存修改" : "新增支出"}</Button>
            {editing ? <Button type="button" variant="secondary" onClick={reset}>取消</Button> : null}
          </div>
        </form>
      </Card>
      <RecordActions records={records} onEdit={startEdit} onDelete={remove} />
    </div>
  );
}

export function InvestmentCrud({ records }: { records: InvestmentRecord[] }) {
  const router = useRouter();
  const [editing, setEditing] = useState<InvestmentRecord | null>(null);
  const [form, setForm] = useState({
    partnerName: "",
    type: "initial_investment",
    amount: "",
    currency: "CNY" as Currency,
    exchangeRate: "",
    date: today(),
    purpose: "",
    relatedExpenseId: "",
    note: "",
    attachmentUrl: ""
  });
  const amountInBaseCurrency = useMemo(() => baseAmount(form.amount, form.currency, form.exchangeRate), [form.amount, form.currency, form.exchangeRate]);

  function startEdit(record: InvestmentRecord) {
    setEditing(record);
    setForm({
      partnerName: record.partnerName,
      type: record.type,
      amount: record.amount,
      currency: record.currency,
      exchangeRate: record.exchangeRate || "",
      date: record.date,
      purpose: record.purpose || "",
      relatedExpenseId: record.relatedExpenseId || "",
      note: record.note || "",
      attachmentUrl: record.attachmentUrl || ""
    });
  }

  function reset() {
    setEditing(null);
    setForm({ partnerName: "", type: "initial_investment", amount: "", currency: "CNY", exchangeRate: "", date: today(), purpose: "", relatedExpenseId: "", note: "", attachmentUrl: "" });
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    const payload = { ...form, amountInBaseCurrency };
    const response = await fetch("/api/investments", {
      method: editing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing ? { id: editing.id, ...payload } : payload)
    });
    if (!response.ok) alert((await response.json()).error || "保存失败");
    reset();
    router.refresh();
  }

  async function remove(id: string) {
    if (!confirm("确认删除这条资金记录？")) return;
    const response = await fetch(`/api/investments?id=${id}`, { method: "DELETE" });
    if (!response.ok) alert((await response.json()).error || "删除失败");
    router.refresh();
  }

  return (
    <div className="mt-6 grid gap-6">
      <Card className="p-5">
        <h2 className="font-semibold">{editing ? "编辑资金记录" : "新增资金记录"}</h2>
        <form className="mt-4 grid gap-4 lg:grid-cols-4" onSubmit={submit}>
          <Field label="日期"><input className={inputClass()} type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required /></Field>
          <Field label="合伙人"><input className={inputClass()} value={form.partnerName} onChange={(e) => setForm({ ...form, partnerName: e.target.value })} required /></Field>
          <Field label="类型"><select className={selectClass()} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>{investmentTypes.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></Field>
          <Field label="金额"><input className={inputClass()} type="number" step="0.01" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} required /></Field>
          <Field label="币种"><select className={selectClass()} value={form.currency} onChange={(e) => setForm({ ...form, currency: e.target.value as Currency })}><option value="CNY">CNY</option><option value="USD">USD</option></select></Field>
          <Field label="汇率"><input className={inputClass()} type="number" step="0.000001" value={form.exchangeRate} onChange={(e) => setForm({ ...form, exchangeRate: e.target.value })} placeholder="USD 时填写" /></Field>
          <Field label="用途"><input className={inputClass()} value={form.purpose} onChange={(e) => setForm({ ...form, purpose: e.target.value })} /></Field>
          <Field label="关联支出 ID"><input className={inputClass()} value={form.relatedExpenseId} onChange={(e) => setForm({ ...form, relatedExpenseId: e.target.value })} /></Field>
          <Field label="凭证链接"><input className={inputClass()} value={form.attachmentUrl} onChange={(e) => setForm({ ...form, attachmentUrl: e.target.value })} /></Field>
          <Field label="备注"><input className={inputClass()} value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} /></Field>
          <div className="flex items-end gap-2">
            <Button type="submit">{editing ? "保存修改" : "新增记录"}</Button>
            {editing ? <Button type="button" variant="secondary" onClick={reset}>取消</Button> : null}
          </div>
        </form>
      </Card>
      <RecordActions records={records} onEdit={startEdit} onDelete={remove} />
    </div>
  );
}

function RecordActions<T extends { id: string }>({ records, onEdit, onDelete }: { records: T[]; onEdit: (record: T) => void; onDelete: (id: string) => void }) {
  return (
    <Card className="p-5">
      <h2 className="font-semibold">快捷操作</h2>
      <div className="mt-4 grid gap-2">
        {records.map((record) => (
          <div key={record.id} className="flex items-center justify-between rounded-md border p-3 text-sm">
            <span className="font-mono text-xs text-muted-foreground">{record.id}</span>
            <div className="flex gap-2">
              <Button type="button" variant="secondary" onClick={() => onEdit(record)}>编辑</Button>
              <Button type="button" variant="secondary" onClick={() => onDelete(record.id)}>删除</Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
