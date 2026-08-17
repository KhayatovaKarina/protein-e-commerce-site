"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Star, Zap, Sparkles } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { formatPrice, formatRating } from "@/lib/utils";
import type { Product } from "@/db/schema";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, openCart } = useCartStore();
  const [adding, setAdding] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const images = product.images as string[];
  const rating = formatRating(product.rating);
  const price = parseFloat(String(product.price));
  const comparePrice = product.comparePrice
    ? parseFloat(String(product.comparePrice))
    : null;
  const discount = comparePrice
    ? Math.round(((comparePrice - price) / comparePrice) * 100)
    : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    setAdding(true);
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price,
      image: images[0],
      flavor: product.flavor,
      weightGrams: product.weightGrams,
    });
    openCart();
    setTimeout(() => setAdding(false), 600);
  };

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-pink-100 transition-all duration-300 border border-pink-50 hover:border-pink-200 hover:-translate-y-1">
        {/* Image */}
        <div className="relative aspect-square bg-gradient-to-br from-pink-50 to-pink-100 overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-5xl animate-pulse">🦄</span>
            </div>
          )}
          <Image
            src={images[0]}
            alt={product.name}
            fill
            className={`object-cover transition-all duration-500 group-hover:scale-105 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && (
              <span className="px-2.5 py-1 bg-pink-500 text-white text-xs font-bold rounded-full shadow-sm">
                Новинка
              </span>
            )}
            {product.isBestseller && (
              <span className="px-2.5 py-1 bg-amber-400 text-white text-xs font-bold rounded-full shadow-sm flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Хит
              </span>
            )}
            {discount && (
              <span className="px-2.5 py-1 bg-red-500 text-white text-xs font-bold rounded-full shadow-sm">
                −{discount}%
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Flavor badge */}
          <span className="inline-block px-2.5 py-0.5 bg-pink-50 text-pink-500 text-xs font-medium rounded-full mb-2">
            {product.flavor}
          </span>

          <h3 className="font-bold text-gray-900 text-base leading-tight mb-1 group-hover:text-pink-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-400 text-xs mb-3 line-clamp-2">
            {product.shortDescription}
          </p>

          {/* Stats */}
          <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
            <span className="flex items-center gap-1">
              <Zap className="w-3 h-3 text-pink-400" />
              {product.proteinPerServing}г белка
            </span>
            <span>{product.weightGrams}г</span>
            <span>{product.servings} порций</span>
          </div>

          {/* Rating */}
          {product.reviewCount! > 0 && (
            <div className="flex items-center gap-1.5 mb-3">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-3 h-3 ${
                      star <= Math.round(rating)
                        ? "text-amber-400 fill-amber-400"
                        : "text-gray-200 fill-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-400">
                ({product.reviewCount})
              </span>
            </div>
          )}

          {/* Price + Add to cart */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-black text-gray-900">
                {formatPrice(price)}
              </div>
              {comparePrice && (
                <div className="text-xs text-gray-400 line-through">
                  {formatPrice(comparePrice)}
                </div>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm ${
                adding
                  ? "bg-green-500 scale-110 shadow-green-200"
                  : "bg-pink-500 hover:bg-pink-600 hover:scale-105 shadow-pink-200"
              }`}
              aria-label="Добавить в корзину"
            >
              {adding ? (
                <span className="text-white text-xs font-bold">✓</span>
              ) : (
                <ShoppingBag className="w-4 h-4 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
