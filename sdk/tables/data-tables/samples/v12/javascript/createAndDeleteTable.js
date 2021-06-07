// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/**
 * This sample demonstrates create and delete a table
 *
 * @summary creates and deletes a table
 */

const { TableServiceClient, TableClient } = require("@azure/data-tables");
const { v4 } = require("uuid");

// Load the .env file if it exists
const dotenv = require("dotenv");
dotenv.config();

const sasConnectionString = process.env["SAS_CONNECTION_STRING"] || "";
const tableSufix = v4().replace(/-/g, "");

async function createAndDeleteTable() {
  console.log("== Delete and create table Sample ==");

  // See authenticationMethods sample for other options of creating a new client
  const serviceClient = TableServiceClient.fromConnectionString(sasConnectionString);

  // Create a new table
  const tableName = `SampleCreateAndDeleteTable${tableSufix}`;
  await serviceClient.createTable(tableName);

  // Deletes the table
  await serviceClient.deleteTable(tableName);
}

async function createAndDeleteTableWithTableClient() {
  // A table can also be created and deleted using a TableClient
  console.log("== Delete and create table with TableClient Sample ==");

  const tableName = "SampleCreateAndDeleteTable2";

  // Creating a new table client doesn't do a network call
  const client = TableClient.fromConnectionString(sasConnectionString, tableName);

  // Will attempt to create a table with the tableName specified above
  await client.createTable();

  // Will attempt to delete the table with the tableName specified above
  await client.deleteTable();
}

async function main() {
  await createAndDeleteTable();
  await createAndDeleteTableWithTableClient();
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
