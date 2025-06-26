import db from "@/db/database";
import { menuItem, inventoryItem, MeasurementUnits, menuItemIngredients } from "@/db/schema";
import { reset } from 'drizzle-seed';


const gram = 1000
const kilogram = 1000000
const liter = 1000
const tsp = 5


async function up() {

  const menuItems = [
    { id: 1, name: 'Filter Coffee' },
    { id: 2, name: 'Americano' },
    { id: 3, name: 'Latte' },
    { id: 4, name: 'Cappuccino' },
    { id: 5, name: 'Cortado' },
    { id: 6, name: 'Macchiato' },
    { id: 7, name: 'Flat White' },
    { id: 8, name: 'Mocha' }
  ];

  const inventoryItems = [
    { id: 1, name: 'Coffee Beans: Espresso Roast', quantity: kilogram, quantityUnit: 'mg' as MeasurementUnits },
    { id: 2, name: 'Coffee Beans: Blonde Roast', quantity: kilogram, quantityUnit: 'mg' as MeasurementUnits },
    { id: 3, name: 'Milk', quantity: 10 * liter, quantityUnit: 'ml' as MeasurementUnits },
    { id: 4, name: 'Cocoa Powder', quantity: 1000 * tsp, quantityUnit: 'tsp' as MeasurementUnits }
  ]

  const filterCoffeeIngredients = [
    { id: 1, menuItemId: 1, inventoryItemId: 2, quantity: 15 * gram, quantityUnit: 'mg' as MeasurementUnits },
  ]

  const americanoIngredients = [
    { id: 2, menuItemId: 2, inventoryItemId: 1, quantity: 16 * gram, quantityUnit: 'mg' as MeasurementUnits },
  ]

  const latteIngredients = [
    { id: 3, menuItemId: 3, inventoryItemId: 1, quantity: 16 * gram, quantityUnit: 'mg' as MeasurementUnits },
    { id: 4, menuItemId: 3, inventoryItemId: 3, quantity: 240, quantityUnit: 'ml' as MeasurementUnits },
  ]

  const cappuccinoIngredients = [
    { id: 5, menuItemId: 4, inventoryItemId: 1, quantity: 16 * gram, quantityUnit: 'mg' as MeasurementUnits },
    { id: 6, menuItemId: 4, inventoryItemId: 3, quantity: 90, quantityUnit: 'ml' as MeasurementUnits },
  ]

  const cortadoIngredients = [
    { id: 7, menuItemId: 5, inventoryItemId: 1, quantity: 16 * gram, quantityUnit: 'mg' as MeasurementUnits },
    { id: 8, menuItemId: 5, inventoryItemId: 3, quantity: 60, quantityUnit: 'ml' as MeasurementUnits },
  ]

  const macchiatoIngredients = [
    { id: 9, menuItemId: 6, inventoryItemId: 1, quantity: 16 * gram, quantityUnit: 'mg' as MeasurementUnits },
    { id: 10, menuItemId: 6, inventoryItemId: 3, quantity: 15, quantityUnit: 'ml' as MeasurementUnits },
  ]

  const flatWhiteIngredients = [
    { id: 11, menuItemId: 7, inventoryItemId: 1, quantity: 18 * gram, quantityUnit: 'mg' as MeasurementUnits },
    { id: 12, menuItemId: 7, inventoryItemId: 3, quantity: 100, quantityUnit: 'ml' as MeasurementUnits },
  ]
  const mochaIngredients = [
    { id: 13, menuItemId: 8, inventoryItemId: 1, quantity: 18 * gram, quantityUnit: 'mg' as MeasurementUnits },
    { id: 14, menuItemId: 8, inventoryItemId: 3, quantity: 250, quantityUnit: 'ml' as MeasurementUnits },
    { id: 15, menuItemId: 8, inventoryItemId: 4, quantity: 2 * tsp, quantityUnit: 'tsp' as MeasurementUnits }
  ]

  await db.transaction(async (tx) => {
    // insert menu items
    await tx
      .insert(menuItem)
      .values(menuItems)
      .onConflictDoNothing()

    // insert inventory items items
    await tx
      .insert(inventoryItem)
      .values(inventoryItems)
      .onConflictDoNothing()

    // insert menu item ingredients
    await tx
      .insert(menuItemIngredients)
      .values([
        ...filterCoffeeIngredients,
        ...americanoIngredients,
        ...latteIngredients,
        ...cappuccinoIngredients,
        ...cortadoIngredients,
        ...macchiatoIngredients,
        ...flatWhiteIngredients,
        ...mochaIngredients
      ])
      .onConflictDoNothing()
  });
}

async function down() {
  await reset(db, { menuItem, menuItemIngredients, inventoryItem });
}


async function runMigration(up: () => Promise<void>, down: () => Promise<void>) {
  try {
    await up();
  } catch(err) {
    console.error(`there was an error while running the data migration`, err);
    await down();
  }
}

runMigration(up, down);
