import db from "@/db/database";
import { menuItemIngredients, inventoryItem } from "@/db/schema"
import { eq } from 'drizzle-orm';

type MeasurementUnit = 'mg' | 'ml'

interface MenuItemIngredientData {
  id: number;
  ingredientName: string;
  quantity: number;
  quantityUnit: MeasurementUnit;
  menuItemId: number;
  inventoryItemId: number;
}

// merge with inventory item
export default class MenuItemIngredient {
  id: number;
  ingredientName: string; // inventoryItem.name
  quantity: number;
  quantityUnit: MeasurementUnit;
  menuItemId: number;
  inventoryItemId: number;

  static async findForMenuItemId(menuItemId: number): Promise<MenuItemIngredient[]> {
    try {
      const menuItemIngredientRecords = await db
        .select()
        .from(menuItemIngredients)
        .leftJoin(inventoryItem, eq(menuItemIngredients.inventoryItemId, inventoryItem.id))
        .where(eq(menuItemIngredients.menuItemId, menuItemId));
      const menuItemIngredientObjects = menuItemIngredientRecords.map((mi) => {
        return new MenuItemIngredient({
          id: mi.menu_item_ingredients.id,
          ingredientName: mi.inventory_items.name,
          quantity: mi.menu_item_ingredients.quantity,
          quantityUnit: mi.menu_item_ingredients.quantityUnit,
          menuItemId: mi.menu_item_ingredients.menuItemId,
          inventoryItemId: mi.inventory_items.id,
        });
      })
      return menuItemIngredientObjects;
    } catch(err) {
      console.error(err);
    }
  }

  constructor(data: MenuItemIngredientData) {
    this.id = data.id;
    this.ingredientName = data.ingredientName;
    this.quantity = data.quantity;
    this.quantityUnit = data.quantityUnit;
    this.menuItemId = data.menuItemId;
    this.inventoryItemId = data.inventoryItemId;
  }
}
