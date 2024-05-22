# Express TypeScript MongoDB API

This project is a RESTful API built with Express.js, TypeScript, and MongoDB. It provides endpoints for managing products and orders.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Build](#build)
  - [Start](#start)
- [API Endpoints](#api-endpoints)
- [Testing with Postman](#testing-with-postman)
- [Contributing](#contributing)
- [License](#license)

## Technologies Used

- Express.js
- TypeScript
- MongoDB
- Mongoose
- Joi/Zod (for data validation)
- Cors (for enabling Cross-Origin Resource Sharing)
- Dotenv (for environment variables)
- ESLint and Prettier (for code linting and formatting)

## Prerequisites

Before running the application, ensure you have the following installed:

- Node.js
- MongoDB

## Getting Started

### Installation

1. Clone this repository:

   ```bash
   git clone <repository-url>
   ```

### API Endpoints

Below are the available endpoints for this API:

#### Products

- **POST /api/products/create-product**: Create a new product
- **GET /api/products/create-product/:id**: Get a product by ID
- **PUT /api/products/create-product/:id**: Update a product
- **DELETE /api/products/create-product/:id**: Delete a product
- **GET /api/products/all-products**: Get all products
- **GET /api/products/search**: Search products

#### Orders

- **POST /api/orders**: Create a new order
- **GET /api/orders**: Get all orders
- **GET /api/orders/order/:id**: Get an order by ID
- **PUT /api/orders/order/:id**: Update an order
- **DELETE /api/orders/order/:id**: Delete an order

### Testing with Postman

You can use Postman to test the API endpoints. Import the provided [Postman collection](./postman-collection.json) and set the environment variables for `base_url`, `product_id`, and `order_id`.

### Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow the standard GitHub workflow: Fork -> Branch -> Pull Request.

### License

This project is licensed under the [MIT License](LICENSE).

---
