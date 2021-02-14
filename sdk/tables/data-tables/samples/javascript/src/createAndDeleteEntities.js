// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const { TableClient, TablesSharedKeyCredential } = require("@azure/data-tables");

// Load the .env file if it exists
const dotenv = require("dotenv");
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

  const entity = {
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

async function main() {
  await createAndDeleteEntities();
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
