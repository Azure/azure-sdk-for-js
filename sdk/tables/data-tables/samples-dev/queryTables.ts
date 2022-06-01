// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/**
 * This sample demonstrates how to query tables
 *
 * @summary queries tables
 * @azsdk-weight 40
 */

import { odata, TableServiceClient } from "@azure/data-tables";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

const accountConnectionString = process.env["ACCOUNT_CONNECTION_STRING"] || "";

async function queryTables() {
  console.log("== Query tables Sample ==");

  // See authenticationMethods sample for other options of creating a new client
  const serviceClient = TableServiceClient.fromConnectionString(accountConnectionString);

  // Create a new table
  const tableName = `queryTables`;
  await serviceClient.createTable(tableName);

  // list the tables with a filter query, queryOptions is optional.
  // odata is a helper function that takes care of encoding the query
  // filter, in this sample it will add quotes around tableName
  const queryTableResults = serviceClient.listTables({
    queryOptions: { filter: odata`TableName eq ${tableName}` },
  });

  // Iterate the results
  for await (const table of queryTableResults) {
    console.log(table.name);
  }

  // Deletes the table
  await serviceClient.deleteTable(tableName);
}

export async function main() {
  await queryTables();
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
