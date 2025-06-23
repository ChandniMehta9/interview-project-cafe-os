import db from "@/db/database";
import { menuItem } from "@/db/schema"
import { eq } from 'drizzle-orm';
import MenuItemIngredient from "./menu-item-ingredients";


export const MENU_ITEM_IDS = {
  filterCoffee: 1,
  americano: 2,
  latte: 3,
  cappuccino: 4,
  cortado: 5,
  macchiato: 6
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

  static async findAll() {
    const menuItemRecords = await db
      .select()
      .from(menuItem)
      .all();
    return menuItemRecords.map(mi => {
      return new MenuItem({
        id: mi.id,
        name: mi.name,
        ingredients: [] // TODO
      })
    })
  }

  static async findById(id: number) {
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

  constructor(data: MenuItemData) {
    this.id = data.id;
    this.name = data.name;
    this.ingredients = data.ingredients;
  }
}
