import Link from "next/link";
import { PageHeader, Panel } from "@/components/accounting/ui";
import { AccountingDatabaseNotice, isAccountingDatabaseConfigured } from "@/lib/accounting/db-status";
import { prisma } from "@/lib/accounting/prisma";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  if (!isAccountingDatabaseConfigured()) return <AccountingDatabaseNotice />;

  const products = await prisma.product.findMany({ orderBy: { updatedAt: "desc" } });
  return (
    <div className="space-y-6">
      <PageHeader title="产品管理" description="导入销售数据时会自动创建产品，也可后续扩展为手工维护。" />
      <Panel title="SKU / ASIN 列表">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-muted-foreground">
                <th className="py-2">父产品</th>
                <th>子产品</th>
                <th>SKU</th>
                <th>ASIN</th>
                <th>站点</th>
                <th>店铺</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b">
                  <td className="py-2">
                    <Link className="text-primary" href={`/admin/accounting/analytics/products/${product.id}`}>
                      {product.parentProductName || product.childProductName || product.sku}
                    </Link>
                  </td>
                  <td>{product.childProductName}</td>
                  <td>{product.sku}</td>
                  <td>{product.asin}</td>
                  <td>{product.marketplace}</td>
                  <td>{product.storeName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
