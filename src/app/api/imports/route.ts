import { NextRequest, NextResponse } from "next/server";
import { isAccountingDatabaseConfigured } from "@/lib/accounting/db-status";
import { prisma } from "@/lib/accounting/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!isAccountingDatabaseConfigured()) {
    return NextResponse.json({ error: "DATABASE_URL is not configured" }, { status: 503 });
  }

  const batches = await prisma.importBatch.findMany({ orderBy: { uploadedAt: "desc" }, take: 50 });
  return NextResponse.json(batches);
}

export async function POST(request: NextRequest) {
  if (!isAccountingDatabaseConfigured()) {
    return NextResponse.json({ error: "DATABASE_URL is not configured" }, { status: 503 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "璇蜂笂浼?CSV 鎴?Excel 鏂囦欢" }, { status: 400 });
    }

    const batch = await prisma.importBatch.create({
      data: {
        fileName: file.name,
        source: "unknown",
        rowCount: 0,
        status: "pending",
        originalHeaders: [],
        previewRows: [],
        rawRows: []
      }
    });

    return NextResponse.json(batch);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "鍒涘缓瀵煎叆鎵规澶辫触" }, { status: 400 });
  }
}
