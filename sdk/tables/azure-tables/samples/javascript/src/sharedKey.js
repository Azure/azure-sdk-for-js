// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const { TableServiceClient, TableClient, TablesSharedKeyCredential } = require("@azure/tables");

// Load the .env file if it exists
const dotenv = require("dotenv");
dotenv.config();

const accountName = process.env["ACCOUNT_NAME"] || "";
const accountKey = process.env["ACCOUNT_KEY"] || "";
const accountUrl = process.env["ACCOUNT_URL"] || "";

async function listTables() {
  const credential = new TablesSharedKeyCredential(accountName, accountKey);
  const client = new TableServiceClient(accountUrl, credential);

  const tables = await client.listTables();

  console.log(tables.value);
}

async function listEntities() {
  const tableName = "test1";
  const credential = new TablesSharedKeyCredential(accountName, accountKey);
  const client = new TableClient(accountUrl, tableName, credential);

  const entities = await client.listEntities();

  console.log(entities.value);
}

async function main() {
  await listTables();
  await listEntities();
}

main().catch(console.error);
