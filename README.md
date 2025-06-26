# Cafe OS

Cafe OS is a new start up app created for managing your own cafe. It includes creating menu items 
and managing the inventory needed for those menu items.

## Getting Started

### Required
- node 24
- pnpm
- sqlite

### Database

In order to start the application, you will need to make sure to have sqlite and make the 
appropriate migrations. Use `pnpm db:migrate` to migrate the database, then use `pnpm data-migrate` 
to seed the initial database with data.

For context, the database library we make use of here is called drizzle. See more information at https://orm.drizzle.team/

### Starting the Application

use `pnpm start` to start the application once the database is situated.

## Additional Features
- Users can now order multiple quantities of any drink at a time.
- After placing the order, the app will prompt the user to order another drink.
- The ordering loop continues until the user selects **Done**.
- The app automatically deducts the required ingredients from inventory.
- If inventory is insufficient, it notifies the user that the drink is unavailable and prompts them to pick a different drink or quantity.
