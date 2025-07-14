// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates create and delete entities in a table
 *
 * @summary creates and deletes a entities in a table
 */

import type { Edm } from "@azure/data-tables";
import { TableClient } from "@azure/data-tables";
import { DefaultAzureCredential, type TokenCredential } from "@azure/identity";
import "dotenv/config";

const tablesUrl = process.env["TABLES_URL"] || "";

async function createSimpleDateEntity(credential: TokenCredential): Promise<void> {
  // Note that this sample assumes that a table with tableName exists
  const tableName = `createSimpleDateEntityTable`;

  const client = new TableClient(tablesUrl, tableName, credential);

  await client.createTable();

  const entity = {
    partitionKey: "p1",
    rowKey: "r1",
    date: new Date(),
  };

  await client.createEntity(entity);

  await client.deleteTable();
}

async function createComplexDateEntity(credential: TokenCredential): Promise<void> {
  // Note that this sample assumes that a table with tableName exists
  const tableName = `createComplexDateEntityTable`;

  const client = new TableClient(tablesUrl, tableName, credential);

  await client.createTable();

  // For higher precision dates we need to pass the
  const date: Edm<"DateTime"> = { type: "DateTime", value: "2016-06-10T21:42:24.7607389" };

  const entity = {
    partitionKey: "p2",
    rowKey: "r2",
    date,
  };

  await client.createEntity(entity);

  await client.deleteTable();
}

async function createAndDeleteEntities(credential: TokenCredential): Promise<void> {
  console.log("== Create and delete entities Sample ==");

  // Note that this sample assumes that a table with tableName exists
  const tableName = `createAndDeleteEntitiesTable`;

  const client = new TableClient(tablesUrl, tableName, credential);

  // Create the table
  await client.createTable();

  const entity: Entity = {
    partitionKey: "Stationery",
    rowKey: "A1",
    name: "Marker Set",
    price: 5.0,
    quantity: 21,
  };

  // Create the new entity
  await client.createEntity(entity);

  // Delete the entity
  await client.deleteEntity(entity.partitionKey, entity.rowKey);

  // Delete the table for cleanup
  // Create the table
  await client.deleteTable();
}

interface Entity {
  partitionKey: string;
  rowKey: string;
  name: string;
  price: number;
  quantity: number;
}

export async function main(): Promise<void> {
  const credential = new DefaultAzureCredential();
  await createAndDeleteEntities(credential);
  await createSimpleDateEntity(credential);
  await createComplexDateEntity(credential);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
