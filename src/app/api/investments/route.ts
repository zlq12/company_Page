import { NextRequest, NextResponse } from "next/server";
import { Currency, InvestmentType } from "@prisma/client";
import { isAccountingDatabaseConfigured } from "@/lib/accounting/db-status";
import { amountInBaseCurrency } from "@/lib/accounting/validators";
import { prisma } from "@/lib/accounting/prisma";
import { saveImageUpload } from "@/lib/accounting/upload";

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
    const formData = await request.formData();
    const image = formData.get("paymentImage");
    if (!(image instanceof File) || image.size === 0) {
      return NextResponse.json({ error: "请上传支付凭证图片" }, { status: 400 });
    }

    const body = Object.fromEntries(formData.entries());
    const amount = Number(body.amount);
    const currency = String(body.currency || "CNY") as Currency;
    const exchangeRate = optionalNumber(body.exchangeRate);
    const attachmentUrl = await saveImageUpload(image, "investments");
    const investment = await prisma.investment.create({
      data: {
        partnerName: String(body.partnerName || ""),
        type: String(body.type) as InvestmentType,
        amount,
        currency,
        exchangeRate,
        amountInBaseCurrency: amountInBaseCurrency(amount, currency, exchangeRate ?? undefined),
        date: new Date(String(body.date)),
        purpose: optionalString(body.purpose),
        relatedExpenseId: optionalString(body.relatedExpenseId),
        note: optionalString(body.note),
        attachmentUrl
      }
    });
    return NextResponse.json(investment);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "创建投资记录失败" }, { status: 400 });
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
    return NextResponse.json({ error: error instanceof Error ? error.message : "更新投资记录失败" }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!isAccountingDatabaseConfigured()) {
    return NextResponse.json({ error: "DATABASE_URL is not configured" }, { status: 503 });
  }

  const id = request.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "缺少记录 ID" }, { status: 400 });
  await prisma.investment.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}

function investmentPayload(body: Record<string, unknown>) {
  const amount = Number(body.amount);
  const currency = String(body.currency || "CNY") as Currency;
  const exchangeRate = optionalNumber(body.exchangeRate);
  return {
    partnerName: String(body.partnerName || ""),
    type: String(body.type) as InvestmentType,
    amount,
    currency,
    exchangeRate,
    amountInBaseCurrency: Number(body.amountInBaseCurrency || amountInBaseCurrency(amount, currency, exchangeRate ?? undefined)),
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
