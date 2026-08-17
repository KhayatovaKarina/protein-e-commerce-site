"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  ShoppingBag,
  Zap,
  Shield,
  Truck,
  ChevronLeft,
  Plus,
  Minus,
  Sparkles,
  ThumbsUp,
  Check,
} from "lucide-react";
import { useCartStore } from "@/store/cart";
import { formatPrice, formatRating, cn } from "@/lib/utils";
import type { Product, Review } from "@/db/schema";

interface Props {
  product: Product;
  reviews: Review[];
}

const tabs = ["Описание", "Состав", "Отзывы"];

export default function ProductDetailClient({ product, reviews }: Props) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("Описание");
  const [adding, setAdding] = useState(false);
  const { addItem, openCart, updateQuantity, items } = useCartStore();

  const images = product.images as string[];
  const price = parseFloat(String(product.price));
  const comparePrice = product.comparePrice
    ? parseFloat(String(product.comparePrice))
    : null;
  const rating = formatRating(product.rating);
  const discount = comparePrice
    ? Math.round(((comparePrice - price) / comparePrice) * 100)
    : null;

  const cartItem = items.find((i) => i.id === product.id);

  const handleAddToCart = () => {
    setAdding(true);
    if (cartItem) {
      updateQuantity(product.id, cartItem.quantity + quantity);
    } else {
      for (let i = 0; i < quantity; i++) {
        addItem({
          id: product.id,
          slug: product.slug,
          name: product.name,
          price,
          image: images[0],
          flavor: product.flavor,
          weightGrams: product.weightGrams,
        });
      }
    }
    setTimeout(() => {
      setAdding(false);
      openCart();
    }, 400);
  };

  const nutritionFacts = [
    { label: "Белок", value: `${product.proteinPerServing}г`, highlight: true },
    { label: "Калории", value: `${product.calories} ккал`, highlight: false },
    { label: "Углеводы", value: "3.5г", highlight: false },
    { label: "Жиры", value: "1.2г", highlight: false },
    { label: "Сахар", value: "1.8г", highlight: false },
    { label: "Натрий", value: "120мг", highlight: false },
  ];

  const ingredients =
    "Сывороточный протеин изолят (молоко), натуральные ароматизаторы, лецитин (соя), стевиол-гликозиды (стевия), коллагеновые пептиды (говяжьи), ниацин (В3), пантотеновая кислота (В5), пиридоксин (В6), биотин (В7), кобаламин (В12), лимонная кислота, гидрокарбонат натрия (для шипения).";

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Link href="/" className="hover:text-pink-500 transition-colors">
            Главная
          </Link>
          <span>/</span>
          <Link
            href="/products"
            className="hover:text-pink-500 transition-colors"
          >
            Продукты
          </Link>
          <span>/</span>
          <span className="text-gray-700 font-medium">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Image Gallery */}
          <div className="space-y-4">
            {/* Main image */}
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-pink-50 to-pink-100">
              <Image
                src={images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover transition-all duration-300"
                priority
              />
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && (
                  <span className="px-3 py-1.5 bg-pink-500 text-white text-xs font-bold rounded-full shadow">
                    Новинка
                  </span>
                )}
                {product.isBestseller && (
                  <span className="px-3 py-1.5 bg-amber-400 text-white text-xs font-bold rounded-full shadow flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Хит продаж
                  </span>
                )}
                {discount && (
                  <span className="px-3 py-1.5 bg-red-500 text-white text-xs font-bold rounded-full shadow">
                    Скидка {discount}%
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={cn(
                      "relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all",
                      selectedImage === i
                        ? "border-pink-500 shadow-md shadow-pink-200"
                        : "border-transparent opacity-60 hover:opacity-100"
                    )}
                  >
                    <Image
                      src={img}
                      alt={`Фото ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product info */}
          <div className="space-y-6">
            {/* Back link */}
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-pink-500 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Все продукты
            </Link>

            {/* Flavor + Category */}
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-pink-50 text-pink-500 text-sm font-semibold rounded-full">
                {product.flavor}
              </span>
              <span className="px-3 py-1 bg-gray-50 text-gray-500 text-sm rounded-full">
                {product.weightGrams}г · {product.servings} порций
              </span>
            </div>

            {/* Name */}
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            {product.reviewCount! > 0 && (
              <div className="flex items-center gap-3">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={cn(
                        "w-5 h-5",
                        star <= Math.round(rating)
                          ? "text-amber-400 fill-amber-400"
                          : "text-gray-200 fill-gray-200"
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-700">
                  {rating.toFixed(1)}
                </span>
                <span className="text-sm text-gray-400">
                  ({product.reviewCount}{" "}
                  {product.reviewCount === 1
                    ? "отзыв"
                    : product.reviewCount! < 5
                    ? "отзыва"
                    : "отзывов"}
                  )
                </span>
              </div>
            )}

            {/* Short description */}
            <p className="text-gray-600 text-lg leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Key stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 bg-pink-50 rounded-2xl">
                <div className="text-2xl font-black text-pink-600">
                  {product.proteinPerServing}г
                </div>
                <div className="text-xs text-gray-500 mt-0.5">белок/порция</div>
              </div>
              <div className="text-center p-3 bg-pink-50 rounded-2xl">
                <div className="text-2xl font-black text-pink-600">
                  {product.calories}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">ккал/порция</div>
              </div>
              <div className="text-center p-3 bg-pink-50 rounded-2xl">
                <div className="text-2xl font-black text-pink-600">
                  {product.servings}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">порций</div>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-black text-gray-900">
                {formatPrice(price)}
              </span>
              {comparePrice && (
                <>
                  <span className="text-xl text-gray-400 line-through">
                    {formatPrice(comparePrice)}
                  </span>
                  <span className="px-2.5 py-1 bg-red-100 text-red-600 text-sm font-bold rounded-full">
                    Экономия {formatPrice(comparePrice - price)}
                  </span>
                </>
              )}
            </div>

            {/* Stock indicator */}
            {product.stock <= 20 && (
              <div className="flex items-center gap-2 p-3 bg-orange-50 rounded-xl border border-orange-100">
                <span className="text-orange-500 font-semibold text-sm">
                  ⚡ Осталось всего {product.stock} штук! Успей заказать.
                </span>
              </div>
            )}

            {/* Quantity + Add to cart */}
            <div className="flex gap-4 items-center">
              <div className="flex items-center gap-3 border-2 border-pink-100 rounded-2xl px-4 py-3">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-pink-50 transition-colors"
                >
                  <Minus className="w-4 h-4 text-pink-500" />
                </button>
                <span className="text-lg font-bold w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity((q) => Math.min(product.stock, q + 1))
                  }
                  className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-pink-50 transition-colors"
                >
                  <Plus className="w-4 h-4 text-pink-500" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={adding}
                className={cn(
                  "flex-1 py-4 rounded-2xl font-bold text-white flex items-center justify-center gap-2 transition-all duration-300 shadow-lg",
                  adding
                    ? "bg-green-500 shadow-green-200 scale-[0.98]"
                    : "bg-gradient-to-r from-pink-500 to-pink-600 shadow-pink-200 hover:from-pink-600 hover:to-pink-700 hover:shadow-pink-300 hover:-translate-y-0.5"
                )}
              >
                {adding ? (
                  <>
                    <Check className="w-5 h-5" />
                    Добавлено!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    В корзину · {formatPrice(price * quantity)}
                  </>
                )}
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="flex flex-col items-center gap-1.5 p-3 bg-gray-50 rounded-2xl text-center">
                <Truck className="w-5 h-5 text-pink-400" />
                <span className="text-xs text-gray-500 leading-tight">
                  Доставка по всей России
                </span>
              </div>
              <div className="flex flex-col items-center gap-1.5 p-3 bg-gray-50 rounded-2xl text-center">
                <Shield className="w-5 h-5 text-pink-400" />
                <span className="text-xs text-gray-500 leading-tight">
                  Гарантия 30 дней
                </span>
              </div>
              <div className="flex flex-col items-center gap-1.5 p-3 bg-gray-50 rounded-2xl text-center">
                <Zap className="w-5 h-5 text-pink-400" />
                <span className="text-xs text-gray-500 leading-tight">
                  Быстрое усвоение
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs section */}
        <div className="mt-16">
          <div className="flex gap-1 border-b-2 border-gray-100 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-6 py-3 font-semibold text-sm transition-all relative",
                  activeTab === tab
                    ? "text-pink-600"
                    : "text-gray-400 hover:text-gray-600"
                )}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-[-2px] left-0 right-0 h-0.5 bg-pink-500 rounded-full" />
                )}
                {tab === "Отзывы" && reviews.length > 0 && (
                  <span className="ml-1.5 px-2 py-0.5 bg-pink-100 text-pink-500 text-xs font-bold rounded-full">
                    {reviews.length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Description tab */}
          {activeTab === "Описание" && (
            <div className="max-w-3xl">
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>
            </div>
          )}

          {/* Nutrition tab */}
          {activeTab === "Состав" && (
            <div className="max-w-2xl space-y-8">
              <div>
                <h3 className="font-black text-gray-900 text-xl mb-4">
                  Пищевая ценность (на порцию {Math.round(product.weightGrams / product.servings)}г)
                </h3>
                <div className="rounded-2xl overflow-hidden border border-gray-100">
                  {nutritionFacts.map((item, i) => (
                    <div
                      key={i}
                      className={cn(
                        "flex justify-between items-center px-5 py-3 text-sm",
                        i % 2 === 0 ? "bg-white" : "bg-gray-50",
                        item.highlight && "bg-pink-50"
                      )}
                    >
                      <span
                        className={cn(
                          "font-medium",
                          item.highlight ? "text-pink-700" : "text-gray-700"
                        )}
                      >
                        {item.label}
                      </span>
                      <span
                        className={cn(
                          "font-bold",
                          item.highlight ? "text-pink-600 text-lg" : "text-gray-900"
                        )}
                      >
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-black text-gray-900 text-xl mb-3">
                  Ингредиенты
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 rounded-2xl p-5">
                  {ingredients}
                </p>
              </div>

              <div>
                <h3 className="font-black text-gray-900 text-xl mb-3">
                  Способ применения
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    {
                      icon: "🥤",
                      title: "С водой",
                      desc: "Смешай 1 мерную ложку (25г) с 250-300мл холодной воды. Взболтай в шейкере.",
                    },
                    {
                      icon: "🥛",
                      title: "С молоком",
                      desc: "Для более кремового вкуса используй миндальное или обычное молоко.",
                    },
                    {
                      icon: "🧊",
                      title: "Ледяной коктейль",
                      desc: "Добавь 3-4 кубика льда и взбей в блендере для освежающего эффекта.",
                    },
                    {
                      icon: "⏰",
                      title: "Когда пить",
                      desc: "После тренировки (в течение 30 минут) или как перекус между приёмами пищи.",
                    },
                  ].map((tip, i) => (
                    <div key={i} className="p-4 bg-pink-50 rounded-2xl">
                      <div className="text-2xl mb-2">{tip.icon}</div>
                      <h4 className="font-bold text-gray-900 text-sm mb-1">
                        {tip.title}
                      </h4>
                      <p className="text-gray-500 text-xs leading-relaxed">
                        {tip.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Reviews tab */}
          {activeTab === "Отзывы" && (
            <div className="max-w-3xl space-y-6">
              {/* Rating summary */}
              <div className="flex items-center gap-6 p-6 bg-pink-50 rounded-3xl">
                <div className="text-center">
                  <div className="text-5xl font-black text-gray-900">
                    {rating.toFixed(1)}
                  </div>
                  <div className="flex justify-center mt-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={cn(
                          "w-4 h-4",
                          s <= Math.round(rating)
                            ? "text-amber-400 fill-amber-400"
                            : "text-gray-200 fill-gray-200"
                        )}
                      />
                    ))}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {reviews.length} отзывов
                  </div>
                </div>
                <div className="flex-1 space-y-1.5">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = reviews.filter((r) => r.rating === star).length;
                    const pct = reviews.length ? (count / reviews.length) * 100 : 0;
                    return (
                      <div key={star} className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="w-2">{star}</span>
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <div className="flex-1 bg-gray-200 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="h-full bg-amber-400 rounded-full transition-all"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="w-4 text-right">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Review cards */}
              {reviews.length === 0 ? (
                <p className="text-gray-400 text-center py-8">
                  Пока нет отзывов. Будь первой! 🦄
                </p>
              ) : (
                reviews.map((review) => (
                  <div
                    key={review.id}
                    className="p-6 rounded-3xl border-2 border-gray-50 hover:border-pink-100 transition-all bg-white shadow-sm"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-xl flex-shrink-0">
                        {review.authorAvatar || "👤"}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-gray-900 text-sm">
                            {review.authorName}
                          </span>
                          {review.verified && (
                            <span className="flex items-center gap-0.5 px-2 py-0.5 bg-green-50 text-green-600 text-xs font-medium rounded-full">
                              <Check className="w-3 h-3" /> Покупка подтверждена
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 mt-1 mb-3">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className={cn(
                                "w-3.5 h-3.5",
                                s <= review.rating
                                  ? "text-amber-400 fill-amber-400"
                                  : "text-gray-200 fill-gray-200"
                              )}
                            />
                          ))}
                        </div>
                        <h4 className="font-bold text-gray-900 mb-1.5">
                          {review.title}
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {review.body}
                        </p>
                        {review.helpful! > 0 && (
                          <div className="flex items-center gap-1.5 mt-3 text-xs text-gray-400">
                            <ThumbsUp className="w-3.5 h-3.5" />
                            {review.helpful} {review.helpful === 1 ? "человек" : "человек"} нашли полезным
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
