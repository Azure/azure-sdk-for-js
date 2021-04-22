// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * This sample demonstrates create and delete entities in a table
 *
 * @summary creates and deletes a entities in a table
 * @azsdk-weight 40
 */

import { Edm, TableClient, TablesSharedKeyCredential } from "@azure/data-tables";
// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

const tablesUrl = process.env["TABLES_URL"] || "";
const accountName = process.env["ACCOUNT_NAME"] || "";
const accountKey = process.env["ACCOUNT_KEY"] || "";

async function createSimpleDateEntity() {
  // Note that this sample assumes that a table with tableName exists
  const tableName = `createAndDeleteEntitiesTable`;

  // See authenticationMethods sample for other options of creating a new client
  const creds = new TablesSharedKeyCredential(accountName, accountKey);
  const client = new TableClient(tablesUrl, tableName, creds);

  const entity = {
    partitionKey: "",
    rowKey: "",
    date: new Date()
  };

  await client.createEntity(entity);
}

async function createComplexDateEntity() {
  // Note that this sample assumes that a table with tableName exists
  const tableName = `createAndDeleteEntitiesTable`;

  // See authenticationMethods sample for other options of creating a new client
  const creds = new TablesSharedKeyCredential(accountName, accountKey);
  const client = new TableClient(tablesUrl, tableName, creds);

  // For higher precision dates we need to pass the
  const date: Edm<"DateTime"> = { type: "DateTime", value: "2016-06-10T21:42:24.7607389" };

  const entity = {
    partitionKey: "",
    rowKey: "",
    date
  };

  await client.createEntity(entity);
}

async function createAndDeleteEntities() {
  console.log("== Create and delete entities Sample ==");

  // Note that this sample assumes that a table with tableName exists
  const tableName = `createAndDeleteEntitiesTable`;

  // See authenticationMethods sample for other options of creating a new client
  const creds = new TablesSharedKeyCredential(accountName, accountKey);
  const client = new TableClient(tablesUrl, tableName, creds);

  // Create the table
  await client.createTableIfNotExists();

  const entity: Entity = {
    partitionKey: "Stationery",
    rowKey: "A1",
    name: "Marker Set",
    price: 5.0,
    quantity: 21
  };

  // Create the new entity
  await client.createEntity({ partitionKey: "p11", rowKey: "23" });

  // Delete the entity
  await client.deleteEntity(entity.partitionKey, entity.rowKey);

  // Delete the table for cleanup
  // Create the table
  await client.deleteTableIfExists();
}

interface Entity {
  partitionKey: string;
  rowKey: string;
  name: string;
  price: number;
  quantity: number;
}

export async function main() {
  await createAndDeleteEntities();
  await createSimpleDateEntity();
  await createComplexDateEntity();
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
