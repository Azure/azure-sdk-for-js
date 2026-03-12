// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to query tables
 *
 * @summary queries tables
 * @azsdk-weight 40
 */

import { odata, TableServiceClient } from "@azure/data-tables";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

const endpoint = process.env.TABLES_URL || "";
async function queryTables(): Promise<void> {
  console.log("== Query tables Sample ==");

  const serviceClient = new TableServiceClient(endpoint, new DefaultAzureCredential());

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

export async function main(): Promise<void> {
  await queryTables();
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
