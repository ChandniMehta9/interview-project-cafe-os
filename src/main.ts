import MenuItem from './models/menu-item';
import { select } from '@inquirer/prompts';

async function askOrder() {
  const menuItems = await MenuItem.findAll();
  const choices = menuItems.map(mi => {
    return {
      name: mi.name,
      value: mi.id,
    }
  })

  const answer = await select({ message: 'Please select what you would like to order', choices });

  return menuItems.find(mi => answer === mi.id);
}

async function main() {
  const item = await askOrder();
  const orderedItem = await MenuItem.findById(item.id);
  console.log(`You ordered a ${orderedItem.name}:`)
  orderedItem.ingredients.forEach(i => console.log(`- ${i.quantity}${i.quantityUnit} ${i.ingredientName}`))
}

main();
