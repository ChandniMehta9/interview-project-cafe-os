import db from "@/db/database";
import { inventoryItem, menuItem } from "@/db/schema"
import { eq } from 'drizzle-orm';
import MenuItemIngredient from "./menu-item-ingredients";


export const MENU_ITEM_IDS = {
  filterCoffee: 1,
  americano: 2,
  latte: 3,
  cappuccino: 4,
  cortado: 5,
  macchiato: 6,
  flatWhite: 7,
  mocha: 8
}


interface MenuItemData {
  id: number;
  name: string;
  ingredients: MenuItemIngredient[]
}


export default class MenuItem {
  id: number;
  name: string;
  ingredients: MenuItemIngredient[]

  /**
   * Finds all menu items in the database.
   * @returns An array of MenuItem objects.
   */
  static async findAll(): Promise<MenuItem[]> {
    const menuItemRecords = await db
      .select()
      .from(menuItem)
      .all();
    return await Promise.all(
      menuItemRecords.map(async (mi) => {
        const ingredients = await MenuItemIngredient.findForMenuItemId(mi.id);
        return new MenuItem({
          id: mi.id,
          name: mi.name,
          ingredients: ingredients
        });
    })
  )};

  /**
   * Finds a menu item by its ID.
   * @param id - The ID of the menu item to find.
   * @returns A MenuItem object or undefined if not found.
   */
  static async findById(id: number): Promise<MenuItem | undefined> {
    try {
      const [menuItemRecord] = await db.select().from(menuItem).where(eq(menuItem.id, id)).limit(1);
      const ingredients = await MenuItemIngredient.findForMenuItemId(id);
      return new MenuItem({
        id: menuItemRecord.id,
        name: menuItemRecord.name,
        ingredients: ingredients
      })
    } catch(err) {
      console.error(err);
    }
  }

  /**
   * Checks if the menu item is available based on its ingredients.
   * @param quantity - The quantity of the menu item being ordered.
   * @returns True if all ingredients are available, false otherwise.
   */
  isAvailable(quantity: number): boolean {
    return this.ingredients.every(ingredient => ingredient.totalQuantity >= ingredient.quantity * quantity);
  }

  /**
   * Gets the missing ingredients for the menu item.
   * @param quantity - The quantity of the menu item being ordered.
   * @returns An array of MenuItemIngredient objects that are missing.
   */
  getMissingIngredients(quantity: number): MenuItemIngredient[] {
    return this.ingredients.filter(ingredient => ingredient.totalQuantity < ingredient.quantity * quantity);
  }


  //  Deducts ingredient quantities from the inventory based on the menu item.
  async updateQuantity(quantity: number) {
    for (const ingredient of this.ingredients) {
      const updatedQty = ingredient.totalQuantity - (ingredient.quantity * quantity);
      if (updatedQty >= 0) {
        await db.update(inventoryItem).set({quantity: updatedQty}).where(eq(inventoryItem.id, ingredient.inventoryItemId));
      }
    }
  }
  constructor(data: MenuItemData) {
    this.id = data.id;
    this.name = data.name;
    this.ingredients = data.ingredients;
  }
}
