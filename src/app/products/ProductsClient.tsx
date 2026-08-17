"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, Search, ChevronDown, X, Sparkles } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/db/schema";
import { cn } from "@/lib/utils";

const categories = [
  { id: "all", label: "Все продукты" },
  { id: "whey", label: "Сывороточный" },
  { id: "isolate", label: "Изолят" },
  { id: "vegan", label: "Веганский" },
  { id: "bundle", label: "Наборы" },
];

const sortOptions = [
  { id: "featured", label: "По популярности" },
  { id: "rating", label: "По рейтингу" },
  { id: "price-asc", label: "Цена: дешевле" },
  { id: "price-desc", label: "Цена: дороже" },
  { id: "newest", label: "Новинки" },
];

export default function ProductsClient() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState("featured");
  const [search, setSearch] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 350);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (category !== "all") params.set("category", category);
    if (sort !== "featured") params.set("sort", sort);
    if (debouncedSearch) params.set("search", debouncedSearch);

    fetch(`/api/products?${params.toString()}`)
      .then((r) => r.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, [category, sort, debouncedSearch]);

  const activeFilters = (category !== "all" ? 1 : 0) + (sort !== "featured" ? 1 : 0) + (debouncedSearch ? 1 : 0);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero header */}
      <div className="bg-gradient-to-br from-pink-50 to-pink-100 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-pink-500 text-white rounded-full text-sm font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Весь ассортимент
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">
            Выбери свой вкус 🦄
          </h1>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            Все варианты Pink Pony Protein — от нежной ванили до взрывной малины
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск по вкусу или названию..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-2xl border-2 border-gray-100 bg-gray-50 focus:outline-none focus:border-pink-300 focus:bg-white transition-all text-sm"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </div>

          {/* Sort dropdown */}
          <div className="relative">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl border-2 border-gray-100 bg-gray-50 hover:border-pink-200 hover:bg-white transition-all text-sm font-medium text-gray-700 whitespace-nowrap"
            >
              <SlidersHorizontal className="w-4 h-4" />
              {sortOptions.find((s) => s.id === sort)?.label}
              <ChevronDown className={cn("w-4 h-4 transition-transform", sortOpen && "rotate-180")} />
            </button>
            {sortOpen && (
              <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-pink-50 z-30 overflow-hidden">
                {sortOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setSort(opt.id);
                      setSortOpen(false);
                    }}
                    className={cn(
                      "w-full text-left px-4 py-3 text-sm hover:bg-pink-50 transition-colors",
                      sort === opt.id && "bg-pink-50 text-pink-600 font-semibold"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-semibold transition-all",
                category === cat.id
                  ? "bg-pink-500 text-white shadow-md shadow-pink-200"
                  : "bg-gray-50 text-gray-600 hover:bg-pink-50 hover:text-pink-500 border border-gray-100"
              )}
            >
              {cat.label}
            </button>
          ))}
          {activeFilters > 0 && (
            <button
              onClick={() => {
                setCategory("all");
                setSort("featured");
                setSearch("");
              }}
              className="flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-semibold text-red-500 bg-red-50 hover:bg-red-100 transition-all border border-red-100"
            >
              <X className="w-3.5 h-3.5" />
              Сбросить
            </button>
          )}
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">
            {loading ? "Загружаем..." : `${products.length} ${products.length === 1 ? "продукт" : products.length < 5 ? "продукта" : "продуктов"}`}
          </p>
        </div>

        {/* Products grid */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-3xl bg-gray-50 animate-pulse h-80" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🦄</div>
            <p className="text-gray-500 text-lg">Ничего не найдено</p>
            <p className="text-gray-400 text-sm mt-1">Попробуй другой вкус или сбрось фильтры</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
