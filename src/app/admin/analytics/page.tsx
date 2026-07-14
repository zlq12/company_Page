import { Card } from "@/components/ui/card";

const rows = [
  ["销售线索", "128", "+24%", "市场部"],
  ["合同金额", "¥ 2,480,000", "+11%", "销售中心"],
  ["项目准时率", "94%", "+5%", "交付中心"],
  ["客户满意度", "4.8/5", "稳定", "客服中心"]
];

export default function AnalyticsPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">经营数据</h1>
      <p className="mt-2 text-sm text-muted-foreground">演示数据表，后续可接入 BI、ERP 或数据库接口。</p>
      <Card className="mt-6 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">指标</th>
              <th className="px-4 py-3 font-medium">当前值</th>
              <th className="px-4 py-3 font-medium">变化</th>
              <th className="px-4 py-3 font-medium">责任部门</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row[0]} className="border-t">
                {row.map((cell) => (
                  <td key={cell} className="px-4 py-3">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </main>
  );
}
