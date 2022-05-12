
## Environment variables

    POSTGRES_HOST=127.0.0.1
    POSTGRES_DB=storefront
    POSTGRES_USER=magical_user
    POSTGRES_PASSWORD=12345678
    POSTGRES_TEST_DB=storefront_test
    POSTGRES_TEST_USER=magical_user_test
    POSTGRES_TEST_PASSWORD=123456
    ENV=dev
    BCRYPT_PASSWORD=speak-friend-and-enter
    SALT_ROUND=13
    JWT_SECRET=sEcReT0RkEy

## The Store Front API
## Scripts 

To start the application in development mode run:

    npm run start

To start the application in watch mode run:

    npm run watch
  To execute the prettier script run:   

    npm run build
   To **only** test the **already built** application run:
   

    npm run jasmine
   To build the application and test it run:
   

    npm run test
   To build the application and run the production version run:

 

## File structure

* **Routing**
All routings are available in the REQUIREMENTS.md file

## Unit Tests

There are unit tests for every functionality the API provides
- There are unit tests for the user inside src/tests/user.spec.ts
- There are unit tests for the order inside src/tests/order.spec.ts
- There are unit tests for the product inside src/tests/product.spec.ts