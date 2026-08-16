"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  Truck,
  Shield,
  CreditCard,
  Check,
  Sparkles,
} from "lucide-react";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  paymentMethod: string;
}

const initialForm: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
  paymentMethod: "card",
};

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart, closeCart } = useCartStore();
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);

  const totalAmount = total();
  const shipping = totalAmount >= 3000 ? 0 : 350;
  const grandTotal = totalAmount + shipping;

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!form.firstName.trim()) newErrors.firstName = "Введите имя";
    if (!form.lastName.trim()) newErrors.lastName = "Введите фамилию";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Введите корректный email";
    if (!form.phone.trim()) newErrors.phone = "Введите телефон";
    if (!form.address.trim()) newErrors.address = "Введите адрес";
    if (!form.city.trim()) newErrors.city = "Введите город";
    if (!form.postalCode.trim()) newErrors.postalCode = "Введите индекс";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            flavor: item.flavor,
          })),
          subtotal: totalAmount,
          shipping,
          total: grandTotal,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setOrderId(data.order.id);
        clearCart();
        closeCart();
        setSuccess(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-24 h-24 rounded-full bg-pink-100 flex items-center justify-center mx-auto mb-6 text-5xl">
            🦄
          </div>
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto -mt-8 mb-6 border-4 border-white">
            <Check className="w-8 h-8 text-green-500" />
          </div>
          <h1 className="text-3xl font-black text-gray-900 mb-2">
            Заказ оформлен!
          </h1>
          <p className="text-pink-500 font-semibold mb-4">
            Заказ №{orderId}
          </p>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Спасибо за покупку, {form.firstName}! 🎀<br />
            Мы отправим подтверждение на <strong>{form.email}</strong>.<br />
            Ожидай свой Pink Pony в течение 1-5 рабочих дней.
          </p>
          <div className="flex flex-col gap-3">
            <Link
              href="/products"
              className="w-full py-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold rounded-2xl hover:from-pink-600 hover:to-pink-700 transition-all shadow-lg shadow-pink-200"
            >
              Продолжить покупки ✨
            </Link>
            <Link
              href="/"
              className="w-full py-3 border-2 border-pink-100 text-pink-500 font-semibold rounded-2xl hover:bg-pink-50 transition-all"
            >
              На главную
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-5xl mb-4">🦄</div>
          <h1 className="text-2xl font-black text-gray-900 mb-2">
            Корзина пуста
          </h1>
          <p className="text-gray-400 mb-6">Добавь продукты перед оформлением</p>
          <Link
            href="/products"
            className="px-8 py-3 bg-pink-500 text-white font-bold rounded-full hover:bg-pink-600 transition-colors"
          >
            Смотреть продукты
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-pink-500 transition-colors mb-4"
          >
            <ChevronLeft className="w-4 h-4" />
            Продолжить покупки
          </Link>
          <h1 className="text-3xl font-black text-gray-900">Оформление заказа</h1>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal info */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <h2 className="font-black text-gray-900 text-lg mb-5 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-pink-500 text-white text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  Личные данные
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Имя *
                    </label>
                    <input
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      placeholder="Анастасия"
                      className={`w-full px-4 py-3 rounded-xl border-2 text-sm focus:outline-none transition-colors ${
                        errors.firstName
                          ? "border-red-300 bg-red-50"
                          : "border-gray-100 focus:border-pink-300"
                      }`}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Фамилия *
                    </label>
                    <input
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      placeholder="Иванова"
                      className={`w-full px-4 py-3 rounded-xl border-2 text-sm focus:outline-none transition-colors ${
                        errors.lastName
                          ? "border-red-300 bg-red-50"
                          : "border-gray-100 focus:border-pink-300"
                      }`}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Email *
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="nastya@mail.ru"
                      className={`w-full px-4 py-3 rounded-xl border-2 text-sm focus:outline-none transition-colors ${
                        errors.email
                          ? "border-red-300 bg-red-50"
                          : "border-gray-100 focus:border-pink-300"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Телефон *
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+7 (999) 123-45-67"
                      className={`w-full px-4 py-3 rounded-xl border-2 text-sm focus:outline-none transition-colors ${
                        errors.phone
                          ? "border-red-300 bg-red-50"
                          : "border-gray-100 focus:border-pink-300"
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Delivery */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <h2 className="font-black text-gray-900 text-lg mb-5 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-pink-500 text-white text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  Адрес доставки
                </h2>
                <div className="grid gap-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Город *
                      </label>
                      <input
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        placeholder="Москва"
                        className={`w-full px-4 py-3 rounded-xl border-2 text-sm focus:outline-none transition-colors ${
                          errors.city
                            ? "border-red-300 bg-red-50"
                            : "border-gray-100 focus:border-pink-300"
                        }`}
                      />
                      {errors.city && (
                        <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Почтовый индекс *
                      </label>
                      <input
                        name="postalCode"
                        value={form.postalCode}
                        onChange={handleChange}
                        placeholder="123456"
                        className={`w-full px-4 py-3 rounded-xl border-2 text-sm focus:outline-none transition-colors ${
                          errors.postalCode
                            ? "border-red-300 bg-red-50"
                            : "border-gray-100 focus:border-pink-300"
                        }`}
                      />
                      {errors.postalCode && (
                        <p className="text-red-500 text-xs mt-1">{errors.postalCode}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Адрес (улица, дом, квартира) *
                    </label>
                    <input
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="ул. Тверская, д. 1, кв. 10"
                      className={`w-full px-4 py-3 rounded-xl border-2 text-sm focus:outline-none transition-colors ${
                        errors.address
                          ? "border-red-300 bg-red-50"
                          : "border-gray-100 focus:border-pink-300"
                      }`}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                    )}
                  </div>
                </div>

                {/* Delivery options */}
                <div className="mt-5 space-y-3">
                  {[
                    { id: "courier", label: "Курьером до двери", price: 350, days: "1-2 дня" },
                    { id: "post", label: "Почта России", price: 250, days: "3-7 дней" },
                    { id: "pickup", label: "Самовывоз из ПВЗ", price: 150, days: "1-3 дня" },
                  ].map((option) => (
                    <label
                      key={option.id}
                      className="flex items-center gap-3 p-4 rounded-xl border-2 border-gray-100 hover:border-pink-200 cursor-pointer transition-all"
                    >
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value={option.id}
                        defaultChecked={option.id === "courier"}
                        className="accent-pink-500"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 text-sm">{option.label}</div>
                        <div className="text-xs text-gray-400">{option.days}</div>
                      </div>
                      <div className="text-sm font-bold text-gray-700">
                        {totalAmount >= 3000 ? (
                          <span className="text-green-600">Бесплатно</span>
                        ) : (
                          formatPrice(option.price)
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Payment */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <h2 className="font-black text-gray-900 text-lg mb-5 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-pink-500 text-white text-xs font-bold flex items-center justify-center">
                    3
                  </span>
                  Способ оплаты
                </h2>
                <div className="space-y-3">
                  {[
                    { id: "card", label: "Банковская карта онлайн", icon: "💳" },
                    { id: "sbp", label: "СБП (Система быстрых платежей)", icon: "⚡" },
                    { id: "cod", label: "Оплата при получении", icon: "💵" },
                  ].map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        form.paymentMethod === method.id
                          ? "border-pink-400 bg-pink-50"
                          : "border-gray-100 hover:border-pink-200"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={form.paymentMethod === method.id}
                        onChange={handleChange}
                        className="accent-pink-500"
                      />
                      <span className="text-xl">{method.icon}</span>
                      <span className="font-medium text-gray-900 text-sm">{method.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-5 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-black text-lg rounded-2xl hover:from-pink-600 hover:to-pink-700 transition-all shadow-xl shadow-pink-200 hover:shadow-pink-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Оформляем...
                  </span>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Оформить заказ · {formatPrice(grandTotal)}
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 sticky top-24">
              <h2 className="font-black text-gray-900 text-lg mb-5">
                Ваш заказ
              </h2>

              {/* Items */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 items-center">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-pink-50 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm leading-tight">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-400">{item.flavor}</p>
                    </div>
                    <div className="text-sm font-bold text-gray-900 flex-shrink-0">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t border-gray-100 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Подытог</span>
                  <span>{formatPrice(totalAmount)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Доставка</span>
                  <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>
                    {shipping === 0 ? "Бесплатно" : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-black text-gray-900 pt-2 border-t border-gray-100">
                  <span>Итого</span>
                  <span className="text-pink-600">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              {/* Trust */}
              <div className="mt-6 space-y-2.5">
                {[
                  { icon: <Truck className="w-4 h-4 text-pink-400" />, text: "Доставка 1-5 рабочих дней" },
                  { icon: <Shield className="w-4 h-4 text-pink-400" />, text: "Гарантия возврата 30 дней" },
                  { icon: <CreditCard className="w-4 h-4 text-pink-400" />, text: "Безопасная оплата (SSL)" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-gray-500">
                    {item.icon}
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>

              {totalAmount < 3000 && (
                <div className="mt-4 p-3 bg-pink-50 rounded-xl text-xs text-pink-700 text-center">
                  🎀 Добавь ещё {formatPrice(3000 - totalAmount)} для бесплатной доставки!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
