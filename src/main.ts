import MenuItem from './models/menu-item';
import { number, select } from '@inquirer/prompts';

async function askOrder() {
  const menuItems = await MenuItem.findAll(); 
  const choices = [
    ...menuItems.map(mi => ({
      name: mi.name,
      value: mi.id,
    })),
    { name: 'Done', value: -1 }
  ];
  const drink = await select({ message: 'Please select what you would like to order', choices });
  if (drink == -1) {
    console.log('Thank you for your order!');
    return null;
  };
  const quantity = await number({ message: `How many ${menuItems.find(m => m.id === drink)!.name}s would you like?`, default: 1, min: 1 });  
  return {
    id: drink,
    quantity: quantity
  };

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
      orderedItem.ingredients.forEach(i => console.log(`- ${item.quantity * i.quantity}${i.quantityUnit} ${i.ingredientName}`))
    }
    else {
      console.error(`Sorry, ${orderedItem.name} is unvaiable at the moment.`);
    }
   
  }
}

main();
