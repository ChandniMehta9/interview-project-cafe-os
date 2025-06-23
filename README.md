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

### Starting the Application

use `pnpm start` to start the application once the database is situated.

## Development Guidelines
Below we layout a few guidelines for the project. Please make sure to read through them completely before starting your project.

__Framework__
The Command Line Interface used is `inquirer`, but feel free to bring in any other CLI frameworks you'd like.

__Language__
Please use Typescript and TSX is used to run the project.

__Backend__
The Application uses SQLite and you will be expected to develop with that.

__Timeboxing__
We know that a product, even as small as this one, can balloon as we think of new ideas and better ways to create the app. We ask that you limit this to no more than 4 hours of total work so that it doesn’t eat into your free time too much and that we have an appropriate baseline to judge it from.

__Testing__
Any kind of automated testing is appreciated, though not required given the time limit provided. However, there should be a way we can test the application’s functionality manually at the bare minimum, ideally by running 1 to 3 commands via CLI.


### Objectives

This project has two main objectives:

- Demonstrate your product mindset and ability to turn product requirements into a working product
- Showcase code quality

We will be evaluating based around these objectives and a follow up chat we have with you after the demo project is finished.

#### User Stories

Right now, we only have menu items, their ingredients, and the inventory in our database. Now its 
time to put these things together to make something a bit more useful.

As someone newly appointed to the scrappy startup, you are charged with building out some core features.

- When a user orders an item, it should deduct from the current inventory
- When a user orders an item, should check if there is enough inventory to make the item
- When a user orders an item, and there is not enough inventory, it should inform the user we are out that item

Any features you decide to develop beyond this is up to you! We will not be giving extra 
consideration for anything outside the original scope.

### I’m done! Now what?

After completion, please send over a link to the git repository of the app and instructions on how to run it locally.

After, we will review the code and let you know next steps.

Happy Coding!
