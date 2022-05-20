
## Environment variables

    POSTGRES_HOST=127.0.0.1
    POSTGRES_DB=storefront
    POSTGRES_USER=magical_user
    POSTGRES_PASSWORD=12345678
    POSTGRES_TEST_DB=storefront_test
    POSTGRES_TEST_USER=magical_user_test
    POSTGRES_TEST_PASSWORD=123456
    NODE_ENV=dev
    BCRYPT_PASSWORD=speak-friend-and-enter
    SALT_ROUND=13
    JWT_SECRET=sEcReT0RkEy

## The Store Front API
## Scripts 

To start the application in development mode run:

    npm run start

To start the application in watch mode run:

    npm run watch
To build the application run:   

    npm run build

To build the application and test it run:
   

    npm run test
[Windows] To build the application and test it :
   

    npm run test:windows

 

## File structure

* **handlers:** the handlers folder contains the handler functions used in routings
* **models:** the models folder contains the schemas and models of the database tables
* **services:** the services folder contains the dashboard controller
* **tests:** the tests folder contains the testing helper and the unit tests required for each function and api endpoin




## Unit Tests

There are unit tests for every functionality the API provides

Unit tests cover all the required model functions and all the API endpoints.
- There are unit tests for the user inside src/tests/user.spec.ts.
- There are unit tests for the order inside src/tests/order.spec.ts
- There are unit tests for the product inside src/tests/product.spec.ts