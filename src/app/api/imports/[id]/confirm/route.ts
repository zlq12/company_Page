import { NextRequest, NextResponse } from "next/server";
import { isAccountingDatabaseConfigured } from "@/lib/accounting/db-status";
import { prisma } from "@/lib/accounting/prisma";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAccountingDatabaseConfigured()) {
    return NextResponse.json({ error: "DATABASE_URL is not configured" }, { status: 503 });
  }

  const { id } = await params;
  const body = await request.json();
  const batch = await prisma.importBatch.update({
    where: { id },
    data: {
      status: "imported",
      mappingConfig: body.mappingConfig || {},
      successCount: body.successCount || 0,
      failedCount: body.failedCount || 0
    }
  });
  return NextResponse.json(batch);
}
