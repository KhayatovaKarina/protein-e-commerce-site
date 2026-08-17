"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, Menu, X, Sparkles } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { toggleCart, itemCount } = useCartStore();
  const count = itemCount();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center shadow-md group-hover:shadow-pink-300 transition-shadow">
              <span className="text-lg">🦄</span>
            </div>
            <div className="leading-none">
              <div className="font-bold text-pink-600 text-lg tracking-tight">
                Pink Pony
              </div>
              <div className="text-[10px] text-pink-400 font-medium tracking-widest uppercase">
                Protein
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-medium text-gray-700 hover:text-pink-500 transition-colors"
            >
              Главная
            </Link>
            <Link
              href="/products"
              className="text-sm font-medium text-gray-700 hover:text-pink-500 transition-colors"
            >
              Продукты
            </Link>
            <Link
              href="/products?category=bundle"
              className="text-sm font-medium text-gray-700 hover:text-pink-500 transition-colors flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              Наборы
            </Link>
            <Link
              href="/products?category=vegan"
              className="text-sm font-medium text-gray-700 hover:text-pink-500 transition-colors"
            >
              Веган
            </Link>
          </div>

          {/* Cart + mobile menu */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleCart}
              className="relative p-2 rounded-full hover:bg-pink-50 transition-colors group"
              aria-label="Открыть корзину"
            >
              <ShoppingBag className="w-5 h-5 text-gray-700 group-hover:text-pink-500 transition-colors" />
              {mounted && count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-pink-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce-in">
                  {count > 9 ? "9+" : count}
                </span>
              )}
            </button>

            <button
              className="md:hidden p-2 rounded-full hover:bg-pink-50 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Меню"
            >
              {mobileOpen ? (
                <X className="w-5 h-5 text-gray-700" />
              ) : (
                <Menu className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-md border-t border-pink-100 px-4 py-4 flex flex-col gap-4">
          <Link
            href="/"
            className="text-gray-700 font-medium hover:text-pink-500 transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            Главная
          </Link>
          <Link
            href="/products"
            className="text-gray-700 font-medium hover:text-pink-500 transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            Продукты
          </Link>
          <Link
            href="/products?category=bundle"
            className="text-gray-700 font-medium hover:text-pink-500 transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            Наборы
          </Link>
          <Link
            href="/products?category=vegan"
            className="text-gray-700 font-medium hover:text-pink-500 transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            Веган
          </Link>
        </div>
      )}
    </nav>
  );
}