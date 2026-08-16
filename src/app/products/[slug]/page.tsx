import { notFound } from "next/navigation";
import { db } from "@/db";
import { products, reviews } from "@/db/schema";
import { eq } from "drizzle-orm";
import ProductDetailClient from "./ProductDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const [product] = await db
    .select()
    .from(products)
    .where(eq(products.slug, slug));

  if (!product) return { title: "Продукт не найден" };
  return {
    title: `${product.name} — Pink Pony Protein`,
    description: product.shortDescription,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const [product] = await db
    .select()
    .from(products)
    .where(eq(products.slug, slug));

  if (!product) notFound();

  const productReviews = await db
    .select()
    .from(reviews)
    .where(eq(reviews.productId, product.id))
    .orderBy(reviews.createdAt);

  return <ProductDetailClient product={product} reviews={productReviews} />;
}
