import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";

export const metadata: Metadata = {
  title: "Pink Pony Protein — Газированный Протеин для девушек",
  description:
    "Первый в России газированный протеин с пони на упаковке. 25г белка, натуральные вкусы, коллаген. Клубника, ваниль, малина, персик-манго, жвачка.",
  keywords: "протеин, спортивное питание, белок, Pink Pony, газированный протеин, для девушек",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body className="bg-white text-gray-900 antialiased">
        <Navbar />
        <CartDrawer />
        {children}
      </body>
    </html>
  );
}
