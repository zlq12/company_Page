"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Select } from "@/components/accounting/ui";
import { standardFields } from "@/lib/accounting/import/mapping";

const fieldLabels: Record<string, string> = {
  date: "销售日期",
  storeName: "店铺",
  marketplace: "站点",
  orderId: "订单号",
  parentProductName: "父产品",
  childProductName: "子产品",
  productName: "商品名称",
  sku: "SKU",
  asin: "ASIN",
  parentAsin: "父 ASIN",
  variationType: "变体类型",
  variationValue: "变体值",
  quantity: "销量",
  grossSales: "销售额",
  refundAmount: "退款金额",
  netSales: "净销售额",
  currency: "币种",
  sessions: "Sessions",
  pageViews: "Page Views",
  conversionRate: "转化率",
  buyBoxPercentage: "Buy Box 占比",
  unitsOrdered: "订购件数"
};

export function MappingForm({ batchId, headers, mapping }: { batchId: string; headers: string[]; mapping: Record<string, string> }) {
  const router = useRouter();
  const [values, setValues] = useState<Record<string, string>>(mapping);
  const [duplicateStrategy, setDuplicateStrategy] = useState("skip");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit() {
    setLoading(true);
    setError("");
    const response = await fetch(`/api/imports/${batchId}/confirm`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mappingConfig: values, duplicateStrategy })
    });
    const payload = await response.json().catch(() => null);
    setLoading(false);
    if (!response.ok) {
      setError(payload?.error || "导入失败，请检查字段映射。");
      return;
    }
    router.push("/admin/accounting/analytics/sales");
    router.refresh();
  }

  return (
    <div className="grid gap-4">
      <div className="grid gap-3 md:grid-cols-2">
        {standardFields.map((field) => (
          <label key={field} className="grid gap-2 text-sm">
            <span className="font-medium">{fieldLabels[field] || field}</span>
            <Select value={values[field] || ""} onChange={(event) => setValues({ ...values, [field]: event.target.value })}>
              <option value="">不映射</option>
              {headers.map((header) => (
                <option key={header} value={header}>
                  {header}
                </option>
              ))}
            </Select>
          </label>
        ))}
      </div>
      <label className="grid max-w-sm gap-2 text-sm">
        <span className="font-medium">重复数据处理</span>
        <Select value={duplicateStrategy} onChange={(event) => setDuplicateStrategy(event.target.value)}>
          <option value="skip">跳过重复</option>
          <option value="overwrite">覆盖重复</option>
          <option value="create_new">创建新记录</option>
        </Select>
      </label>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <Button disabled={loading} onClick={submit}>
        {loading ? "导入中" : "确认导入"}
      </Button>
    </div>
  );
}
