// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates how to connect to Azure Database for PostgreSQL using
 * Entra ID authentication with the `pg` (node-postgres) library.
 */

const pg = require("pg");
const { DefaultAzureCredential } = require("@azure/identity");
const { entraTokenProvider } = require("@azure/postgresql-auth");
const dotenv = require("dotenv");

dotenv.config();

const { Pool } = pg;

async function main() {
  const credential = new DefaultAzureCredential();

  // Create a connection pool that uses Entra ID tokens as the password.
  // The `password` option accepts a function that returns a Promise<string>,
  // so the token is refreshed automatically on each new connection.
  const pool = new Pool({
    host: process.env.PGHOST,
    port: Number(process.env.PGPORT || 5432),
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: () => entraTokenProvider(credential),
    ssl: { rejectUnauthorized: true },
    connectionTimeoutMillis: 20000,
    idleTimeoutMillis: 30000,
  });

  try {
    console.log("Connecting to Azure Database for PostgreSQL...");

    const client = await pool.connect();
    try {
      const { rows } = await client.query(
        "SELECT current_user, now() AS server_time, pg_backend_pid() AS backend_pid",
      );
      console.log("Connected successfully:", rows[0]);
    } finally {
      client.release();
    }
  } finally {
    await pool.end();
    console.log("Pool closed.");
  }
}

main().catch((error) => {
  console.error("Error:", error.message);
  process.exit(1);
});
