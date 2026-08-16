import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  numeric,
  boolean,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  nameEn: varchar("name_en", { length: 255 }).notNull(),
  description: text("description").notNull(),
  shortDescription: text("short_description").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  comparePrice: numeric("compare_price", { precision: 10, scale: 2 }),
  images: jsonb("images").notNull().$type<string[]>(),
  flavor: varchar("flavor", { length: 100 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  weightGrams: integer("weight_grams").notNull(),
  servings: integer("servings").notNull(),
  proteinPerServing: integer("protein_per_serving").notNull(),
  calories: integer("calories").notNull(),
  isNew: boolean("is_new").default(false),
  isBestseller: boolean("is_bestseller").default(false),
  isFeatured: boolean("is_featured").default(false),
  stock: integer("stock").notNull().default(100),
  rating: numeric("rating", { precision: 3, scale: 2 }).default("0"),
  reviewCount: integer("review_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  productId: integer("product_id")
    .notNull()
    .references(() => products.id),
  authorName: varchar("author_name", { length: 255 }).notNull(),
  authorAvatar: varchar("author_avatar", { length: 10 }),
  rating: integer("rating").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  body: text("body").notNull(),
  verified: boolean("verified").default(true),
  helpful: integer("helpful").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  address: text("address").notNull(),
  city: varchar("city", { length: 255 }).notNull(),
  postalCode: varchar("postal_code", { length: 20 }).notNull(),
  items: jsonb("items").notNull(),
  subtotal: numeric("subtotal", { precision: 10, scale: 2 }).notNull(),
  shipping: numeric("shipping", { precision: 10, scale: 2 }).notNull(),
  total: numeric("total", { precision: 10, scale: 2 }).notNull(),
  status: varchar("status", { length: 50 }).notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export type Product = typeof products.$inferSelect;
export type Review = typeof reviews.$inferSelect;
export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;
