import { Suspense } from "react";
import ProductsClient from "./ProductsClient";

export const metadata = {
  title: "Продукты — Pink Pony Protein",
  description: "Все вкусы газированного протеина Pink Pony. Клубника, ваниль, малина, персик-манго, жвачка.",
};

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4 animate-bounce">🦄</div>
          <p className="text-pink-500 font-medium">Загружаем вкусы...</p>
        </div>
      </div>
    }>
      <ProductsClient />
    </Suspense>
  );
}
