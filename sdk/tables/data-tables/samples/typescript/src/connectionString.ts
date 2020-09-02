// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TableServiceClient, TableClient } from "@azure/data-tables";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

const connectionString = process.env["ACCOUNT_CONNECTION_STRING"] || "";
// const connectionString = process.env["SAS_CONNECTION_STRING"] || "";
async function listTables() {
  const client = TableServiceClient.fromConnectionString(connectionString);

  const tables = client.listTables();

  for await (let table of tables) {
    console.log(table);
    // {TableName: "TestTable"}
  }
}

async function listEntities() {
  const client = TableClient.fromConnectionString(connectionString, "test1");

  const entities = client.listEntities();

  for await (const entity of entities) {
    console.log(entity);
    // {PartitionKey: "P1", RowKey: "R1", foo: "Bar"}
  }
}

async function main() {
  await listTables();
  await listEntities();
}

main().catch(console.error);
