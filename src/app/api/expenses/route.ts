import { NextRequest, NextResponse } from "next/server";
import { Currency, ExpenseCategory } from "@prisma/client";
import { isAccountingDatabaseConfigured } from "@/lib/accounting/db-status";
import { prisma } from "@/lib/accounting/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!isAccountingDatabaseConfigured()) {
    return NextResponse.json({ error: "DATABASE_URL is not configured" }, { status: 503 });
  }

  const expenses = await prisma.expense.findMany({ orderBy: { date: "desc" }, take: 100 });
  return NextResponse.json(expenses);
}

export async function POST(request: NextRequest) {
  if (!isAccountingDatabaseConfigured()) {
    return NextResponse.json({ error: "DATABASE_URL is not configured" }, { status: 503 });
  }

  try {
    const body = await request.json();
    const expense = await prisma.expense.create({ data: expensePayload(body) });
    return NextResponse.json(expense);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "鍒涘缓鏀嚭澶辫触" }, { status: 400 });
  }
}

export async function PUT(request: NextRequest) {
  if (!isAccountingDatabaseConfigured()) {
    return NextResponse.json({ error: "DATABASE_URL is not configured" }, { status: 503 });
  }

  try {
    const body = await request.json();
    const expense = await prisma.expense.update({
      where: { id: body.id },
      data: expensePayload(body)
    });
    return NextResponse.json(expense);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "鏇存柊鏀嚭澶辫触" }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!isAccountingDatabaseConfigured()) {
    return NextResponse.json({ error: "DATABASE_URL is not configured" }, { status: 503 });
  }

  const id = request.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "缂哄皯璁板綍 ID" }, { status: 400 });
  await prisma.expense.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}

function expensePayload(body: Record<string, unknown>) {
  return {
    date: new Date(String(body.date)),
    category: String(body.category) as ExpenseCategory,
    amount: Number(body.amount),
    currency: String(body.currency || "CNY") as Currency,
    exchangeRate: optionalNumber(body.exchangeRate),
    amountInBaseCurrency: Number(body.amountInBaseCurrency || body.amount),
    payer: String(body.payer || ""),
    description: String(body.description || ""),
    subCategory: optionalString(body.subCategory),
    paymentAccount: optionalString(body.paymentAccount),
    relatedPartner: optionalString(body.relatedPartner),
    relatedStore: optionalString(body.relatedStore),
    relatedMarketplace: optionalString(body.relatedMarketplace),
    relatedSku: optionalString(body.relatedSku),
    relatedAsin: optionalString(body.relatedAsin),
    relatedBatchNo: optionalString(body.relatedBatchNo),
    supplier: optionalString(body.supplier),
    note: optionalString(body.note),
    attachmentUrl: optionalString(body.attachmentUrl)
  };
}

function optionalString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function optionalNumber(value: unknown) {
  if (value === null || value === undefined || value === "") return null;
  return Number(value);
}
