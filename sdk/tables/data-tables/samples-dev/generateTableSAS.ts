// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/**
 * This sample demonstrates how to query entities in a table
 *
 * @summary queries entities in a table
 * @azsdk-weight 40
 */

import { TableClient } from "@azure/data-tables";
import { AzureNamedKeyCredential } from "@azure/core-auth";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

const tablesUrl = process.env["TABLES_URL"] || "";
const accountKey = process.env["ACCOUNT_KEY"] || "";
const accountName = process.env["ACCOUNT_NAME"] || "";

async function generateTableSAS() {
  console.log("== Generate Table SAS Sample ==");

  // Note that this sample assumes that a table with tableName exists
  const tableName = `generateSASTable`;
  console.log(tableName);

  // See authenticationMethods sample for other options of creating a new client
  const client = new TableClient(
    tablesUrl,
    tableName,
    new AzureNamedKeyCredential(accountName, accountKey)
  );

  await client.createTable();

  const sas =
    "sv=2019-02-02&spr=https,http&se=2021-12-12T00:00:00.000Z&sr=/table/generateSASTable/joheredistorage2&sp=raud&sig=ZkDlherm2rFgZQ1KDsHyYSq0Q3FyGHNA25EqaiC7r2I%3D";

  const client2 = new TableClient(`${tablesUrl}?${sas}`, tableName);
  await client2.createEntity({ partitionKey: "1", rowKey: "1", foo: "foo" });

  const result = await client2.getEntity("1", "1");

  console.log(result);
}

export async function main() {
  await generateTableSAS();
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
