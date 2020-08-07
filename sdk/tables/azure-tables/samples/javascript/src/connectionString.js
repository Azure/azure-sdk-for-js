// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const { TableServiceClient, TableClient } = require("@azure/tables");

// Load the .env file if it exists
const dotenv = require("dotenv");
dotenv.config();

const connectionString = process.env["ACCOUNT_CONNECTION_STRING"] || "";
// const connectionString = process.env["SAS_CONNECTION_STRING"] || "";

async function listTables() {
  const client = TableServiceClient.fromConnectionString(connectionString);

  const tables = await client.listTables();

  console.log(tables.value);
}

async function listEntities() {
  const client = TableClient.fromConnectionString(connectionString, "test1");

  const entities = await client.listEntities();

  console.log(entities.value);
}

async function main() {
  await listTables();
  await listEntities();
}

main().catch(console.error);
