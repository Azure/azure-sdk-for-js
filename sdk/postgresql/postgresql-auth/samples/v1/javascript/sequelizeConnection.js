// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates how to connect to Azure Database for PostgreSQL using
 * Entra ID authentication with Sequelize ORM.
 */

const { Sequelize } = require("sequelize");
const { DefaultAzureCredential } = require("@azure/identity");
const { configureEntraAuthentication } = require("@azure/postgresql-auth");
const dotenv = require("dotenv");

dotenv.config();

async function main() {
  const credential = new DefaultAzureCredential();

  // Create a Sequelize instance with PostgreSQL dialect
  const sequelize = new Sequelize({
    dialect: "postgres",
    host: process.env.PGHOST,
    port: Number(process.env.PGPORT || 5432),
    database: process.env.PGDATABASE,
    dialectOptions: { ssl: { rejectUnauthorized: true } },
    pool: { min: 2, max: 10, idle: 30000 },
  });

  // Register the Entra ID `beforeConnect` hook.
  // This automatically sets the username and password on each new connection.
  configureEntraAuthentication(sequelize, credential);

  try {
    console.log("Connecting to Azure Database for PostgreSQL via Sequelize...");

    await sequelize.authenticate();
    console.log("Connected successfully with Entra ID!");

    const [results] = await sequelize.query(
      "SELECT current_user, now() AS server_time, pg_backend_pid() AS backend_pid",
    );
    console.log("Query result:", results[0]);
  } finally {
    await sequelize.close();
    console.log("Connections closed.");
  }
}

main().catch((error) => {
  console.error("Error:", error.message);
  process.exit(1);
});
