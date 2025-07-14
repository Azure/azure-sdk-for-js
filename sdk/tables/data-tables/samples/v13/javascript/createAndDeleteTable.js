// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * This sample demonstrates create and delete a table
 *
 * @summary creates and deletes a table
 */

const { TableServiceClient, TableClient } = require("@azure/data-tables");
const { DefaultAzureCredential } = require("@azure/identity");
const { randomUUID } = require("@azure/core-util");
require("dotenv/config");

const endpoint = process.env.TABLES_URL || "https://accountname.table.core.windows.net/";
const tableSufix = randomUUID().replace(/-/g, "");

async function createAndDeleteTable(credential) {
  console.log("== Delete and create table Sample ==");

  // See authenticationMethods sample for other options of creating a new client
  const serviceClient = new TableServiceClient(endpoint, credential);

  // Create a new table
  const tableName = `SampleCreateAndDeleteTable${tableSufix}`;
  await serviceClient.createTable(tableName);

  // Deletes the table
  await serviceClient.deleteTable(tableName);
}

async function createAndDeleteTableWithTableClient(credential) {
  // A table can also be created and deleted using a TableClient
  console.log("== Delete and create table with TableClient Sample ==");

  const tableName = "SampleCreateAndDeleteTable2";

  // Creating a new table client doesn't do a network call
  const client = new TableClient(endpoint, tableName, credential);

  // Will attempt to create a table with the tableName specified above
  await client.createTable();

  // Will attempt to delete the table with the tableName specified above
  await client.deleteTable();
}

async function main() {
  const credential = new DefaultAzureCredential();
  await createAndDeleteTable(credential);
  await createAndDeleteTableWithTableClient(credential);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
