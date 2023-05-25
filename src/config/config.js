const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Define a schema for verification
const schema = {
  DB_USER: '',
  DB_HOST: '',
  DB_NAME: '',
  DB_PASSWORD: '',
  DB_PORT: '',
  JWT_SECRET: '',
};

// Verify that all required environment variables are defined
for (const key in schema) {
  if (!process.env[key]) {
    throw new Error(`Environment variable ${key} is not defined`);
  }

  schema[key] = process.env[key];
}

module.exports = schema;
