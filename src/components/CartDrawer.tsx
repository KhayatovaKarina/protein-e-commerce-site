"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Plus, Minus, ShoppingBag, Sparkles, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";

export default function CartDrawer() {
  const { isOpen, closeCart, items, updateQuantity, removeItem, total } =
    useCartStore();
  const totalAmount = total();

  const shipping = totalAmount >= 3000 ? 0 : 350;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-pink-100 bg-gradient-to-r from-pink-50 to-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-pink-500" />
            <h2 className="text-lg font-bold text-gray-900">Корзина</h2>
            {items.length > 0 && (
              <span className="px-2 py-0.5 bg-pink-100 text-pink-600 text-xs font-bold rounded-full">
                {items.reduce((s, i) => s + i.quantity, 0)}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-2 rounded-full hover:bg-pink-50 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Free shipping notice */}
        {totalAmount > 0 && totalAmount < 3000 && (
          <div className="px-6 py-3 bg-pink-50 border-b border-pink-100">
            <p className="text-xs text-pink-700 text-center">
              🎀 Добавь ещё{" "}
              <span className="font-bold">{formatPrice(3000 - totalAmount)}</span>{" "}
              для бесплатной доставки!
            </p>
          </div>
        )}
        {totalAmount >= 3000 && (
          <div className="px-6 py-3 bg-green-50 border-b border-green-100">
            <p className="text-xs text-green-700 text-center font-medium">
              ✨ Бесплатная доставка применена!
            </p>
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="w-20 h-20 rounded-full bg-pink-50 flex items-center justify-center text-4xl">
                🦄
              </div>
              <div>
                <p className="text-gray-900 font-semibold text-lg">
                  Корзина пуста
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Добавь свой первый протеин!
                </p>
              </div>
              <button
                onClick={closeCart}
                className="px-6 py-2.5 bg-pink-500 text-white rounded-full text-sm font-medium hover:bg-pink-600 transition-colors"
              >
                Смотреть продукты
              </button>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-4 p-3 rounded-2xl border border-pink-50 bg-white hover:border-pink-200 transition-colors"
                >
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-pink-50 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm leading-tight">
                      {item.name}
                    </p>
                    <p className="text-xs text-pink-400 mt-0.5">{item.flavor} · {item.weightGrams}г</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-6 h-6 rounded-full border border-pink-200 flex items-center justify-center hover:bg-pink-50 transition-colors"
                        >
                          <Minus className="w-3 h-3 text-pink-500" />
                        </button>
                        <span className="text-sm font-semibold w-5 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-6 h-6 rounded-full border border-pink-200 flex items-center justify-center hover:bg-pink-50 transition-colors"
                        >
                          <Plus className="w-3 h-3 text-pink-500" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-900">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1 rounded-full hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-red-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-pink-100 bg-gradient-to-r from-white to-pink-50">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Подытог</span>
                <span>{formatPrice(totalAmount)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Доставка</span>
                <span
                  className={shipping === 0 ? "text-green-600 font-medium" : ""}
                >
                  {shipping === 0 ? "Бесплатно" : formatPrice(shipping)}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-pink-100">
                <span>Итого</span>
                <span className="text-pink-600">
                  {formatPrice(totalAmount + shipping)}
                </span>
              </div>
            </div>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="w-full py-3.5 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold rounded-full flex items-center justify-center gap-2 hover:from-pink-600 hover:to-pink-700 transition-all shadow-lg shadow-pink-200 hover:shadow-pink-300"
            >
              <Sparkles className="w-4 h-4" />
              Оформить заказ
            </Link>
            <button
              onClick={closeCart}
              className="w-full mt-2 py-2.5 text-sm text-pink-500 font-medium hover:text-pink-600 transition-colors"
            >
              Продолжить покупки
            </button>
          </div>
        )}
      </div>
    </>
  );
}
