import { NextRequest, NextResponse } from "next/server";
import { Currency, InvestmentType } from "@prisma/client";
import { isAccountingDatabaseConfigured } from "@/lib/accounting/db-status";
import { prisma } from "@/lib/accounting/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!isAccountingDatabaseConfigured()) {
    return NextResponse.json({ error: "DATABASE_URL is not configured" }, { status: 503 });
  }

  const investments = await prisma.investment.findMany({ orderBy: { date: "desc" }, take: 100 });
  return NextResponse.json(investments);
}

export async function POST(request: NextRequest) {
  if (!isAccountingDatabaseConfigured()) {
    return NextResponse.json({ error: "DATABASE_URL is not configured" }, { status: 503 });
  }

  try {
    const body = await request.json();
    const investment = await prisma.investment.create({ data: investmentPayload(body) });
    return NextResponse.json(investment);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "鍒涘缓璧勯噾璁板綍澶辫触" }, { status: 400 });
  }
}

export async function PUT(request: NextRequest) {
  if (!isAccountingDatabaseConfigured()) {
    return NextResponse.json({ error: "DATABASE_URL is not configured" }, { status: 503 });
  }

  try {
    const body = await request.json();
    const investment = await prisma.investment.update({
      where: { id: body.id },
      data: investmentPayload(body)
    });
    return NextResponse.json(investment);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "鏇存柊璧勯噾璁板綍澶辫触" }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!isAccountingDatabaseConfigured()) {
    return NextResponse.json({ error: "DATABASE_URL is not configured" }, { status: 503 });
  }

  const id = request.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "缂哄皯璁板綍 ID" }, { status: 400 });
  await prisma.investment.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}

function investmentPayload(body: Record<string, unknown>) {
  return {
    partnerName: String(body.partnerName || ""),
    type: String(body.type) as InvestmentType,
    amount: Number(body.amount),
    currency: String(body.currency || "CNY") as Currency,
    exchangeRate: optionalNumber(body.exchangeRate),
    amountInBaseCurrency: Number(body.amountInBaseCurrency || body.amount),
    date: new Date(String(body.date)),
    purpose: optionalString(body.purpose),
    relatedExpenseId: optionalString(body.relatedExpenseId),
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
