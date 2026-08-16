import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { orders } from "@/db/schema";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const {
    firstName,
    lastName,
    email,
    phone,
    address,
    city,
    postalCode,
    items,
    subtotal,
    shipping,
    total,
  } = body;

  if (!firstName || !lastName || !email || !phone || !address || !city || !postalCode || !items?.length) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const [order] = await db
    .insert(orders)
    .values({
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      postalCode,
      items,
      subtotal: String(subtotal),
      shipping: String(shipping),
      total: String(total),
      status: "confirmed",
    })
    .returning();

  return NextResponse.json({ order, success: true });
}
