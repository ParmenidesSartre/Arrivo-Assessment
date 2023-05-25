const pool = require('../config/database');
const { hashPassword } = require('../utils/hash.utils');

const dropTableIfExists = async (tableName) => {
  const query = `DROP TABLE IF EXISTS ${tableName} CASCADE;`;
  await pool.query(query);
};

const createUsersTable = async () => {
  const query = `CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    fullName VARCHAR(255),
    membership VARCHAR(255) DEFAULT 'Normal',
    createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
    updatedAt TIMESTAMP NOT NULL DEFAULT NOW()
  );`;
  await pool.query(query);
};

const createCategoriesTable = async () => {
  const query = `CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    activated BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
  );`;
  await pool.query(query);
};

const createPostsTable = async () => {
  const query = `CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    category_id INTEGER REFERENCES categories(id),
    status VARCHAR(50) DEFAULT 'Draft',
    label VARCHAR(50) DEFAULT 'Normal',
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
  );`;
  await pool.query(query);
};

const createPaymentsTable = async () => {
  const query = `CREATE TABLE IF NOT EXISTS payments (
    id SERIAL PRIMARY KEY,
    payment_id VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    payment_method VARCHAR(50),
    status VARCHAR(50),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
  );`;
  await pool.query(query);
};

const seedAdminAccount = async () => {
  const hashedPassword = await hashPassword('admin1234');
  const query = `
    INSERT INTO users (username, password, email, fullName, membership, createdAt, updatedAt)
    VALUES ('admin', $1, 'admin@example.com', 'Admin User', 'Admin', NOW(), NOW());
  `;
  await pool.query(query, [hashedPassword]);
};

const seedUsersAccounts = async () => {
  const hashedPassword = await hashPassword('user1234');
  const query = `
    INSERT INTO users (username, password, email, fullName, createdAt, updatedAt)
    VALUES ('user', $1, 'user@example.com', 'Normal User', NOW(), NOW());
  `;
  await pool.query(query, [hashedPassword]);
};

const seedPremiumAccounts = async () => {
  const hashedPassword = await hashPassword('premium1234');
  const query = `
    INSERT INTO users (username, password, email, fullName, membership, createdAt, updatedAt)
    VALUES ('premium', $1, 'premium@example.com', 'Premium User', 'Premium', NOW(), NOW());
  `;
  await pool.query(query, [hashedPassword]);
};

const seedCategories = async () => {
  const categories = [
    {
      name: 'Technology',
      description: 'The latest technology news and trends',
    },
    {
      name: 'Travel',
      description: 'Explore the world with travel guides and tips',
    },
    {
      name: 'Food',
      description: 'Discover delicious recipes and food recommendations',
    },
    {
      name: 'Fitness',
      description: 'Stay fit and healthy with workout guides and tips',
    },
    {
      name: 'Fashion',
      description: 'Get inspired with the latest fashion trends and styles',
    },
  ];

  const query = `
    INSERT INTO categories (name, description, created_at, updated_at)
    VALUES ($1, $2, NOW(), NOW())
  `;

  for (const category of categories) {
    await pool.query(query, [category.name, category.description]);
  }
};

const seedPosts = async () => {
  const posts = [
    {
      title: 'The Future of Artificial Intelligence',
      body: 'Learn about the advancements and potential of AI in various industries.',
      categoryId: 1, // Technology category
    },
    {
      title: 'Top Travel Destinations in 2023',
      body: 'Explore the most popular travel destinations for your next vacation.',
      categoryId: 2, // Travel category
    },
    {
      title: 'Delicious Pasta Recipes for Pasta Lovers',
      body: 'Try these mouthwatering pasta recipes that are easy to make at home.',
      categoryId: 3, // Food category
    },
    {
      title: 'Effective Workout Tips for Building Muscles',
      body: 'Discover the best workout techniques for gaining muscle mass and strength.',
      categoryId: 4, // Fitness category
    },
    {
      title: 'Latest Fashion Trends for the Spring Season',
      body: 'Stay stylish with these trendy fashion tips and outfit ideas for spring.',
      categoryId: 5, // Fashion category
    },
  ];

  const query = `
    INSERT INTO posts (title, body, category_id, created_at, updated_at)
    VALUES ($1, $2, $3, NOW(), NOW())
  `;

  for (const post of posts) {
    await pool.query(query, [post.title, post.body, post.categoryId]);
  }
};

const initDb = async () => {
  try {
    await createUsersTable();
    await createCategoriesTable();
    await createPostsTable();
    await createPaymentsTable();

    // await seedAdminAccount();
    // await seedCategories();
    // await seedPosts();
    // await seedUsersAccounts();
    // await seedPremiumAccounts();

    console.log('Database initialized successfully.');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

module.exports = initDb;
