// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/**
 * This sample demonstrates how to create an Account SAS token. An account SAS token
 * provides access to the whole Tables Service account, given the permissions selected,
 * by default the only permission granted is list
 *
 * @summary generate a Table Account SAS token
 * @azsdk-weight 40
 */

import { generateAccountSAS, TableClient, TableServiceClient } from "@azure/data-tables";
import { AzureNamedKeyCredential, AzureSASCredential } from "@azure/core-auth";

// Load the .env file if it exists
import * as dotenv from "dotenv";
import { AccountSASPermissions } from "../src/sas/accountSASPermissions";
dotenv.config();

const tablesUrl = process.env["TABLES_URL"] || "";
const accountKey = process.env["ACCOUNT_KEY"] || "";
const accountName = process.env["ACCOUNT_NAME"] || "";

async function generateTableSASSample() {
  console.log("== Generate Table Account SAS Sample ==");

  // We need a NamedKeyCredential to generate the SAS token
  const cred = new AzureNamedKeyCredential(accountName, accountKey);

  // We can optionally set the permissions we want on the SAS token
  // If non is specified, only list is granted
  const permissions = new AccountSASPermissions();
  // Grants permission to list tables
  permissions.list = true;
  // Grants permission to create tables
  permissions.write = true;
  // Grants permission to create entities
  permissions.add = true;
  // Grants permission to list entities
  permissions.read = true;
  // Grants permission to delete tables and entities
  permissions.delete = true;

  // Generate an account SAS with the NamedKeyCredential and the permissions set previously
  const accountSAS = generateAccountSAS(cred, { permissions, expiresOn: new Date("2021-12-12") });

  const tableService = new TableServiceClient(tablesUrl, new AzureSASCredential(accountSAS));

  // Create a new table
  const tableName = "fooTable";
  await tableService.createTable(tableName);

  // List all the tables in the service account
  const tables = tableService.listTables();
  for await (const table of tables) {
    console.log(table);
  }

  // Create a new client for the table we just created. We can use the same Account SAS token
  const table = new TableClient(tablesUrl, tableName, new AzureSASCredential(accountSAS));

  // Create an entity in the table
  await table.createEntity({ partitionKey: "test", rowKey: "1", foo: "bar" });

  // List all the entities in the table
  const entities = table.listEntities();
  for await (const entity of entities) {
    console.log(entity);
  }

  // Delete the entity we just created
  await table.deleteEntity("test", "1");

  // Delete the Table
  await table.deleteTable();
}

export async function main() {
  await generateTableSASSample();
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
