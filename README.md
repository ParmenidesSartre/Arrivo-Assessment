# Arrivo-Assessment

This repository contains the back-end code for Arrivo-Assessment, a small web application that allows users to manage users, categories, and posts. The application uses Express.js for routing, PostgreSQL for database storage, and also includes authentication and payment processing.

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Routes](#routes)
- [Possible Improvement](#improvement)

## Requirements

- Node.js v14+
- PostgreSQL
- npm

## Installation

1. Clone this repository: `git clone https://github.com/your_username_/Arrivo-Assessment.git`
2. Change into the `Arrivo-Assessment` directory: `cd Arrivo-Assessment`
3. Install dependencies: `npm install`
4. Create a PostgreSQL database and import the `schema.sql` file to create the tables.
5. Create a `.env` file in the `root` directory of the project and add your database connection details and your BillPlz API_KEY. Here is an example:

   ```
   DB_USER=username
   DB_PASSWORD=password
   DB_HOST=localhost
   DB_PORT=port_number
   DB_NAME=database_name
   JWT_SECRET=your_jwt_secret_key
   BILLPLZ_API_KEY=your_billplz_api_key
   ```

6. Run the application: `npm start`

The server will start at `http://localhost:3000`.

## Routes

| Route                   | Method | Middleware/Validation                  | Controller Function                  | Description                                                                                                         |
|-------------------------|--------|---------------------------------------|--------------------------------------|---------------------------------------------------------------------------------------------------------------------|
| `/users/login`          | POST   | None                                  | `loginUserController`                | Logs in a user                                                                                                      |
| `/users/upgrade`        | POST   | `authenticate`                        | `upgradeUserController`              | Upgrades a user account                                                                                             |
| `/users`                | GET    | `authenticate`, `isAdmin`             | `getAllUsersController`              | Gets all user accounts (admin only)                                                                                 |
| `/users`                | POST   | `validationMiddleware(createUser)`    | `addUserController`                  | Creates a new user account                                                                                          |
| `/users/:id`            | GET    | `authenticate`, `validationMiddleware(getUser)` | `getUserByIdController` | Retrieves a user account by ID                                                                                       |
| `/users/:id`            | PATCH  | `authenticate`, `validationMiddleware(updateUser)` | `updateUserController` | Updates a user account by ID                                                                                         |
| `/users/:id`            | DELETE | `authenticate`, `validationMiddleware(deleteUser)` | `deleteUserController` | Deletes a user account by ID (admin only)                                                                            |
| `/categories`           | GET    | `authenticate`                        | `getAllCategoriesController`         | Retrieves all categories                                                                                            |
| `/categories`           | POST   | `authenticate`, `isAdmin`, `validationMiddleware(createCategory)` | `addCategoryController` | Creates a new category (admin only)                                                                                  |
| `/categories/:id`       | GET    | `authenticate`, `validationMiddleware(getCategory)` | `getCategoryByIdController` | Retrieves a category by ID                                                                                           |
| `/categories/:id`       | PATCH  | `authenticate`, `isAdmin`, `validationMiddleware(updateCategory)` | `updateCategoryController` | Updates a category by ID (admin only)                                                                                |
| `/categories/:id`       | DELETE | `authenticate`, `isAdmin`, `validationMiddleware(deleteCategory)` | `deleteCategoryController` | Deletes a category by ID (admin only)                                                                                |
| `/posts`                | GET    | `authenticate`, `isAdmin`             | `getAllPostsController`              | Retrieves all posts (admin only)                                                                                    |
| `/posts`                | POST   | `authenticate`, `isAdmin`, `validationMiddleware(createPost)` | `addPostController` | Creates a new post (admin only)                                                                                      |
| `/posts/all`            | GET    | `authenticate`                        | `getAllPostsByLabelAndStatusController` | Retrieves all posts by label and status                                                                              |
| `/posts/:id`            | GET    | `authenticate`, `validationMiddleware(getPost)` | `getPostByIdController` | Retrieves a post by ID                                                                                               |
| `/posts/:id`            | PATCH  | `authenticate`, `isAdmin`, `validationMiddleware(updatePost)` | `updatePostController` | Updates a post by ID (admin only)                                                                                    |
| `/posts/:id`            | DELETE | `authenticate`, `isAdmin`, `validationMiddleware(deletePost)` | `deletePostController` | Deletes a post by ID (admin only)                                                                                    |
| `/payments/webhook`     | POST   | None                                  | `webhookController`                 | Handles webhook events                                                                                               |
| `/payments`             | GET    | None                                  | `getPaymentsController`             | Retrieves all payments                                                                                              |


## Improvement
- Centralized error handling to avoid repeating
- I would prefer to be able to use ORM as i think it help me to go faster
- Better handling of webhook

## Problem faced
- Lack of ORM
- Making the webhook to work, i think i use the wrong one as they lack payment method field.
- Implement husky but i cannot finish it. 
