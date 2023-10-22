// Update with your config settings.

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: process.env.SOCIAL_DB || "social",
      user: process.env.POSTGRES_USERNAME || "postgres",
      password: process.env.POSTGRES_PASSWORD || "postgres",
      host: "postgres",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
