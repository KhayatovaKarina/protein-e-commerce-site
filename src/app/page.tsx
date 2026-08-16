import Image from "next/image";
import Link from "next/link";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { Zap, Star, Sparkles, ChevronRight, Shield, Truck, Award, Heart } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { formatRating } from "@/lib/utils";

async function getFeaturedProducts() {
  return db
    .select()
    .from(products)
    .where(eq(products.isFeatured, true))
    .orderBy(desc(products.isBestseller))
    .limit(4);
}

async function getBestsellers() {
  return db
    .select()
    .from(products)
    .where(eq(products.isBestseller, true))
    .limit(3);
}

export default async function HomePage() {
  const [featuredProducts, bestsellers] = await Promise.all([
    getFeaturedProducts(),
    getBestsellers(),
  ]);

  const benefits = [
    {
      icon: <Zap className="w-6 h-6 text-pink-500" />,
      title: "25г белка",
      desc: "На каждую порцию — чистый сывороточный изолят",
    },
    {
      icon: <Sparkles className="w-6 h-6 text-pink-500" />,
      title: "Газированный вкус",
      desc: "Уникальная формула с натуральной шипучестью",
    },
    {
      icon: <Heart className="w-6 h-6 text-pink-500" />,
      title: "Коллаген + B-витамины",
      desc: "Для красоты кожи, волос и ногтей",
    },
    {
      icon: <Shield className="w-6 h-6 text-pink-500" />,
      title: "Без аспартама",
      desc: "Только натуральные подсластители стевия",
    },
  ];

  const stats = [
    { value: "50 000+", label: "довольных клиентов" },
    { value: "4.9★", label: "средний рейтинг" },
    { value: "6", label: "уникальных вкусов" },
    { value: "0", label: "искусственных красителей" },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-pink-50 via-white to-pink-100">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-pink-200/30 blur-3xl" />
          <div className="absolute bottom-0 -left-20 w-80 h-80 rounded-full bg-pink-300/20 blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-pink-100/50 blur-2xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div className="space-y-8 relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-100 text-pink-600 rounded-full text-sm font-semibold">
                <Sparkles className="w-4 h-4" />
                <span>Газированный протеин #1 в России</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] text-gray-900">
                Красота.{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-pink-700">
                  Сила.
                </span>{" "}
                <br />
                Розовая{" "}
                <span className="relative">
                  магия
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 300 12"
                    fill="none"
                  >
                    <path
                      d="M2 10 Q150 2 298 10"
                      stroke="#f472b6"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Первый в России <strong>газированный протеин</strong> с мило нарисованной пони на упаковке. 25г белка, натуральные вкусы, коллаген в составе — для тех, кто тренируется стильно.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold rounded-full hover:from-pink-600 hover:to-pink-700 transition-all shadow-xl shadow-pink-200 hover:shadow-pink-300 hover:-translate-y-0.5 text-base"
                >
                  Выбрать вкус
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/products?category=bundle"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-pink-600 font-bold rounded-full hover:bg-pink-50 transition-all border-2 border-pink-200 hover:border-pink-300 text-base"
                >
                  Стартовый набор 🎁
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center gap-6 pt-2">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-pink-400" />
                  <span className="text-sm text-gray-500">
                    Доставка по всей России
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-pink-400" />
                  <span className="text-sm text-gray-500">
                    Сертификат качества
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-pink-400" />
                  <span className="text-sm text-gray-500">
                    Гарантия 30 дней
                  </span>
                </div>
              </div>
            </div>

            {/* Hero image */}
            <div className="relative flex items-center justify-center">
              <div className="relative w-full max-w-lg aspect-square">
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-full bg-pink-300/30 blur-3xl scale-90" />
                <Image
                  src="/images/main.jpg"
                  alt="Pink Pony Protein — Газированный Протеин"
                  fill
                  className="object-cover rounded-3xl shadow-2xl shadow-pink-200"
                  priority
                />
                {/* Floating badge */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-white rounded-2xl shadow-xl flex flex-col items-center justify-center border-2 border-pink-100 rotate-6">
                  <span className="text-2xl font-black text-pink-600">25г</span>
                  <span className="text-xs text-gray-500 text-center leading-tight">
                    чистого<br />белка
                  </span>
                </div>
                <div className="absolute -bottom-4 -left-4 w-28 h-14 bg-white rounded-2xl shadow-xl flex items-center justify-center gap-2 border-2 border-pink-100 -rotate-3">
                  <span className="text-xl">⭐</span>
                  <div>
                    <div className="text-sm font-black text-gray-900">4.9 / 5</div>
                    <div className="text-xs text-gray-400">50 000+ отзывов</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-gradient-to-r from-pink-500 to-pink-600 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            {stats.map((stat) => (
              <div key={stat.value}>
                <div className="text-2xl md:text-3xl font-black">{stat.value}</div>
                <div className="text-pink-100 text-sm mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-pink-50 text-pink-500 rounded-full text-sm font-semibold mb-4">
              Почему Pink Pony?
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">
              Протеин, который хочется пить
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <div
                key={i}
                className="p-6 rounded-3xl border-2 border-pink-50 hover:border-pink-200 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-pink-50 bg-white"
              >
                <div className="w-12 h-12 rounded-2xl bg-pink-50 flex items-center justify-center mb-4">
                  {b.icon}
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">{b.title}</h3>
                <p className="text-gray-500 text-sm">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gradient-to-b from-pink-50/50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-pink-100 text-pink-600 rounded-full text-sm font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                Коллекция
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900">
                Featured вкусы 🦄
              </h2>
            </div>
            <Link
              href="/products"
              className="hidden md:flex items-center gap-1 text-pink-500 font-semibold hover:text-pink-600 transition-colors"
            >
              Все продукты
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-pink-500 text-white font-bold rounded-full hover:bg-pink-600 transition-colors"
            >
              Все продукты
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Lifestyle section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-pink-100">
                <Image
                  src="/images/lifestyle-1.jpg"
                  alt="Pink Pony Protein — стиль жизни"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-40 h-40 rounded-3xl overflow-hidden border-4 border-white shadow-xl">
                <Image
                  src="/images/lifestyle-2.jpg"
                  alt="Команда Pink Pony"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="space-y-6 lg:pl-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-pink-50 text-pink-500 rounded-full text-sm font-semibold">
                Для спортивных девушек
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">
                Тренируйся ярко.{" "}
                <span className="text-pink-500">Восстанавливайся</span>{" "}
                вкусно.
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Pink Pony Protein создан специально для активных девушек, которые любят тренировки так же сильно, как любят выглядеть на все 100. Наш протеин — это не просто добавка, это часть твоего lifestyle.
              </p>
              <ul className="space-y-3">
                {[
                  "Быстрое восстановление после тренировки",
                  "Укрепление мышц без лишней массы",
                  "Поддержка здоровья кожи и волос",
                  "Никаких компромиссов со вкусом",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs text-pink-600 font-bold">✓</span>
                    </span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold rounded-full hover:from-pink-600 hover:to-pink-700 transition-all shadow-lg shadow-pink-200"
              >
                Начать прямо сейчас
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="py-20 bg-gradient-to-b from-pink-50/50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 text-amber-600 rounded-full text-sm font-bold mb-3">
              <Star className="w-3.5 h-3.5 fill-amber-500" />
              Хиты продаж
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">
              Любимые у покупателей
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {bestsellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Reviews snippet */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-pink-50 text-pink-500 rounded-full text-sm font-semibold mb-3">
              Отзывы
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">
              Они уже попробовали 💕
            </h2>
            <div className="flex items-center justify-center gap-2 mt-3">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-5 h-5 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <span className="text-gray-500 font-medium">4.9 из 5 (50 000+ отзывов)</span>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Анастасия К.",
                avatar: "👩",
                rating: 5,
                text: "Лучший протеин в моей жизни! Клубничный вкус просто невероятный — натуральный, не приторный. Подруги уже все спрашивают, где взяла 🦄",
                product: "Клубничный Блеск",
              },
              {
                name: "Дарья Н.",
                avatar: "🎉",
                rating: 5,
                text: "Это просто ШЕДЕВР! Розовая жвачка — такая ностальгия и одновременно радость. Беру на соревнования — поднимает настроение мгновенно!",
                product: "Розовая Жвачка",
              },
              {
                name: "Алина Б.",
                avatar: "🌺",
                rating: 5,
                text: "Лето в баночке! Персик и манго — идеальное сочетание. Наконец-то веганский протеин, который действительно вкусный. Всем советую!",
                product: "Персиковый Рай",
              },
            ].map((review, i) => (
              <div
                key={i}
                className="p-6 rounded-3xl border-2 border-pink-50 hover:border-pink-200 transition-all hover:shadow-lg hover:shadow-pink-50 bg-white"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-xl">
                    {review.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">{review.name}</div>
                    <div className="text-xs text-pink-400">{review.product}</div>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-pink-500 to-pink-700 px-8 py-16 text-center text-white">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
            </div>
            <div className="relative z-10">
              <div className="text-5xl mb-4">🦄✨</div>
              <h2 className="text-3xl md:text-4xl font-black mb-4">
                Не знаешь, какой вкус выбрать?
              </h2>
              <p className="text-pink-100 text-lg mb-8 max-w-xl mx-auto">
                Попробуй все 5 вкусов в нашем Стартовом Наборе! Красивая подарочная коробка с пони, 5 мини-банок, выгода 23%.
              </p>
              <Link
                href="/products/sparkling-starter-pack"
                className="inline-flex items-center gap-2 px-10 py-4 bg-white text-pink-600 font-black rounded-full hover:bg-pink-50 transition-all shadow-xl hover:-translate-y-0.5 text-lg"
              >
                Взять Стартовый Набор 🎁
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-sm">
                  🦄
                </div>
                <div className="text-white font-bold">Pink Pony Protein</div>
              </div>
              <p className="text-sm leading-relaxed">
                Газированный протеин для спортивных девушек. Сделано с любовью в России.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Продукты</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/products?category=whey" className="hover:text-pink-400 transition-colors">Сывороточный протеин</Link></li>
                <li><Link href="/products?category=isolate" className="hover:text-pink-400 transition-colors">Изолят</Link></li>
                <li><Link href="/products?category=vegan" className="hover:text-pink-400 transition-colors">Веганский</Link></li>
                <li><Link href="/products?category=bundle" className="hover:text-pink-400 transition-colors">Наборы</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Покупателям</h4>
              <ul className="space-y-2 text-sm">
                <li><span className="cursor-pointer hover:text-pink-400 transition-colors">Доставка и оплата</span></li>
                <li><span className="cursor-pointer hover:text-pink-400 transition-colors">Возврат товара</span></li>
                <li><span className="cursor-pointer hover:text-pink-400 transition-colors">FAQ</span></li>
                <li><span className="cursor-pointer hover:text-pink-400 transition-colors">О нас</span></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Контакты</h4>
              <ul className="space-y-2 text-sm">
                <li>info@pinkponyprotein.ru</li>
                <li>8 (800) 555-35-35</li>
                <li>Москва, Россия</li>
                <li className="flex gap-3 pt-1">
                  <span className="cursor-pointer hover:text-pink-400 text-lg" title="Instagram">📸</span>
                  <span className="cursor-pointer hover:text-pink-400 text-lg" title="VKontakte">💬</span>
                  <span className="cursor-pointer hover:text-pink-400 text-lg" title="Telegram">✈️</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm">© 2024 Pink Pony Protein. Все права защищены.</p>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4" />
              <span className="text-sm">Доставка по всей России · от 1 до 5 дней</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
