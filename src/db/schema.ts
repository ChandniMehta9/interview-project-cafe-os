import { sqliteTable as table } from "drizzle-orm/sqlite-core"
import * as t from "drizzle-orm/sqlite-core";
import { sql } from 'drizzle-orm';

export type MeasurementUnits = 'mg' | 'ml'
const useQuantityUnit = () => t.text().notNull().$type<MeasurementUnits>()


export const inventoryItem = table('inventory_items', {
  id: t.integer().primaryKey({ autoIncrement: true }),
  name: t.text().notNull(),
  quantity: t.integer().notNull(),
  quantityUnit: useQuantityUnit(),
  createdAt: t.text().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: t.text().default(sql`CURRENT_TIMESTAMP`),
});

export const menuItem = table('menu_items', {
  id: t.integer().primaryKey({ autoIncrement: true }),
  name: t.text().notNull(),
  createdAt: t.text().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: t.text().default(sql`CURRENT_TIMESTAMP`),
  deletedAt: t.text(),
});

export const menuItemIngredients = table('menu_item_ingredients', {
  id: t.integer().primaryKey({ autoIncrement: true }),
  quantity: t.integer().notNull(),
  quantityUnit: useQuantityUnit(),
  menuItemId: t.integer().notNull().references(() => menuItem.id),
  inventoryItemId: t.integer().notNull().references(() => inventoryItem.id),
});
