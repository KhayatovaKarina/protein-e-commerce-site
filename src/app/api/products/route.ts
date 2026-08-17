import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq, like, and, gte, lte, desc, asc, or } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const sort = searchParams.get("sort") || "featured";
  const search = searchParams.get("search");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  const conditions = [];

  if (category && category !== "all") {
    conditions.push(eq(products.category, category));
  }

  if (search) {
    conditions.push(
      or(
        like(products.name, `%${search}%`),
        like(products.flavor, `%${search}%`)
      )
    );
  }

  if (minPrice) {
    conditions.push(gte(products.price, minPrice));
  }

  if (maxPrice) {
    conditions.push(lte(products.price, maxPrice));
  }

  let orderBy;
  switch (sort) {
    case "price-asc":
      orderBy = asc(products.price);
      break;
    case "price-desc":
      orderBy = desc(products.price);
      break;
    case "rating":
      orderBy = desc(products.rating);
      break;
    case "newest":
      orderBy = desc(products.createdAt);
      break;
    default:
      orderBy = desc(products.isFeatured);
  }

  const result = await db
    .select()
    .from(products)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(orderBy);

  return NextResponse.json(result);
}
