import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-8xl mb-6">🦄</div>
        <h1 className="text-4xl font-black text-gray-900 mb-3">404</h1>
        <h2 className="text-xl font-bold text-gray-700 mb-4">
          Страница не найдена
        </h2>
        <p className="text-gray-400 mb-8">
          Пони ускакала куда-то не туда... Давай вернёмся!
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-3 bg-pink-500 text-white font-bold rounded-full hover:bg-pink-600 transition-colors shadow-lg shadow-pink-200"
          >
            На главную
          </Link>
          <Link
            href="/products"
            className="px-8 py-3 border-2 border-pink-200 text-pink-500 font-bold rounded-full hover:bg-pink-50 transition-colors"
          >
            Продукты
          </Link>
        </div>
      </div>
    </div>
  );
}
