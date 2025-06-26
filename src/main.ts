import MenuItem from './models/menu-item';
import { number, select } from '@inquirer/prompts';

async function askOrder() {
  const menuItems = await MenuItem.findAll(); 
  const choices = [
    ...menuItems.map(mi => ({
      name: mi.name,
      value: mi.id,
    })),
    { name: 'Done', value: -1 } // option to finish ordering
  ];
  // Display the menu items and ask the user to select one
  const drink = await select({ message: 'Please select what you would like to order', choices });
  if (drink == -1) {
    console.log('Thank you for your order!');
    return null;
  };
  // Ask for the quantity of the selected drink
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
      // Log the order details
      console.log(`You ordered ${item.quantity} ${orderedItem.name}:`)
      orderedItem.ingredients.forEach(i => console.log(`- ${item.quantity * i.quantity}${i.quantityUnit} ${i.ingredientName}`))
    }
    // If the item is not available, inform the user
    else {
      console.error(`Sorry, ${item.quantity} ${orderedItem.name}${item.quantity > 1 ? 's are ' : ' is '}unvaiable at the moment.`);
    }
   
  }
}

main();
