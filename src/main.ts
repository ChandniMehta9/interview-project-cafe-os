import { menuItem } from './db/schema';
import MenuItem from './models/menu-item';
import { select } from '@inquirer/prompts';

async function askOrder() {
  const menuItems = await MenuItem.findAll(); 
  const choices = [
    ...menuItems.map(mi => ({
      name: mi.name,
      value: mi.id,
    })),
    { name: 'Done', value: -1 }
  ];
  
  while (true) {
    const drink = await select({ message: 'Please select what you would like to order', choices });
    if (drink == -1) {
      console.log('Thank you for your order!');
      return null;
    };
    const quantity = await select({ message: `How many ${menuItems.find(m => m.id === drink)!.name}s? would you like?`, choices: [1, 2, 3, 4, 5].map(q => ({ name: `${q}`, value: q })) });
    return {
      id: drink,
      quantity: quantity
    };
  }
}

async function main() {
  while (true) {
    const item = await askOrder();
    if (!item) {
      break; 
    }
    const orderedItem = await MenuItem.findById(item.id);
    if (orderedItem.isAvailable(item.quantity)) {
      await orderedItem.updateQuantity(item.quantity);
      console.log(`You ordered ${item.quantity} ${orderedItem.name}:`)
      orderedItem.ingredients.forEach(i => console.log(`- ${i.quantity}${i.quantityUnit} ${i.ingredientName}`))
    }
    else {
      console.error(`Sorry, ${orderedItem.name} is unvaiable at the moment.`);
      return;
    }
   
  }
}

main();
