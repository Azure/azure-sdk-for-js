// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * This sample demonstrates create and delete a table
 *
 * @summary creates and deletes a table
 * @azsdk-weight 40
 */

import { TableServiceClient, TableClient } from "@azure/data-tables";
import { randomUUID } from "@azure/core-util";
import "dotenv/config";

const sasConnectionString = process.env["SAS_CONNECTION_STRING"] || "";
const tableSufix = randomUUID().replace(/-/g, "");

async function createAndDeleteTable(): Promise<void> {
  console.log("== Delete and create table Sample ==");

  // See authenticationMethods sample for other options of creating a new client
  const serviceClient = TableServiceClient.fromConnectionString(sasConnectionString);

  // Create a new table
  const tableName = `SampleCreateAndDeleteTable${tableSufix}`;
  await serviceClient.createTable(tableName);

  // Deletes the table
  await serviceClient.deleteTable(tableName);
}

async function createAndDeleteTableWithTableClient(): Promise<void> {
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

export async function main(): Promise<void> {
  await createAndDeleteTable();
  await createAndDeleteTableWithTableClient();
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
