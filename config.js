module.exports = {
  development: {
    username: "cyrilcanete",
    password: null,
    database: "cyrilcanete",
    host: "localhost",
    port: "5432",
    dialect: "postgres",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    url: process.env.DATABASE_URL || null,
    username: process.env.DATABASE_USER || "root",
    password: process.env.DATABASE_PASSWORD || null,
    database: process.env.DATABASE_NAME || "root",
    host: process.env.DATABASE_HOST || "localhost",
    port: process.env.DATABASE_PORT || "5432",
    dialect: "postgres",
  },
};
