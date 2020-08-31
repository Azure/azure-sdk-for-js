// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TableServiceClient, TableClient, TablesSharedKeyCredential } from "@azure/data-tables";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

const accountName = process.env["ACCOUNT_NAME"] || "";
const accountKey = process.env["ACCOUNT_KEY"] || "";
const accountUrl = process.env["ACCOUNT_URL"] || "";

async function listTables() {
  const credential = new TablesSharedKeyCredential(accountName, accountKey);
  const client = new TableServiceClient(accountUrl, credential);

  const tables = client.listTables();

  for await (let table of tables) {
    console.log(table);
    // {TableName: "TestTable"}
  }
}

async function listEntities() {
  const tableName = "test1";
  const credential = new TablesSharedKeyCredential(accountName, accountKey);
  const client = new TableClient(accountUrl, tableName, credential);

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
