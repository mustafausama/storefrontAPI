# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index                                     GET /products
- Show (args: product id)                   GET /products/:id
- Create (args: Product)[token required]    POST /products
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]                GET /users
- Show (args: id)[token required]       GET /users/:id
- Create (args: User)[token required]   POST /users

- Register                              POST /users/register
- Login                                 POST /users/login

#### Orders
- Current Order by user (args: user id)[token required]     GET /order-by-user
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- username [user should have a unique username]
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)


## Database Schemas
#### Users
- id: primary key
- username: varchar(50) unique
- firstName: varchar(50) unique
- lastName: varchar(50) unique
- password_digest VARCHAR

#### Orders
- id primary key,
- user_id bigint references users(id),
- status VARCHAR ['active' or 'complete']

#### Products
- id primary key,
- name varchar,
- price decimal(10,2)

#### OrderProducts
- id primary key,
- quantity integer,
- order_id bigint references orders(id),
- product_id bigint references products(id)
