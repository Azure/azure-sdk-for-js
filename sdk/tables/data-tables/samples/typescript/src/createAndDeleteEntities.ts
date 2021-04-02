// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TableClient, TablesSharedKeyCredential } from "@azure/data-tables";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

const tablesUrl = process.env["TABLES_URL"] || "";
const accountName = process.env["ACCOUNT_NAME"] || "";
const accountKey = process.env["ACCOUNT_KEY"] || "";

async function createAndDeleteEntities() {
  console.log("== Create and delete entities Sample ==");

  // Note that this sample assumes that a table with tableName exists
  const tableName = "OfficeSupplies2p1";

  // See authenticationMethods sample for other options of creating a new client
  const creds = new TablesSharedKeyCredential(accountName, accountKey);
  const client = new TableClient(tablesUrl, tableName, creds);

  const entity: Entity = {
    partitionKey: "Stationery",
    rowKey: "A1",
    name: "Marker Set",
    price: 5.0,
    quantity: 21
  };

  // Create the new entity
  await client.createEntity(entity);

  // Delete the entity
  await client.deleteEntity(entity.partitionKey, entity.rowKey);
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
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
