// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/**
 * This sample demonstrates how to query entities in a table by page by manually handling the continuation token
 *
 * @summary queries entities in a table by page manually handling continuation tokens
 */

import {
  TableClient,
  AzureSASCredential,
  TransactionAction,
  TableEntityResultPage
} from "@azure/data-tables";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

const tablesUrl = process.env["TABLES_URL"] || "";
const sasToken = process.env["SAS_TOKEN"] || "";

async function listEntitiesPage() {
  const tableName = `manualListByPage`;

  // See authenticationMethods sample for other options of creating a new client
  const client = new TableClient(tablesUrl, tableName, new AzureSASCredential(sasToken));
  // Create the table
  await client.createTable();

  let actions: TransactionAction[] = [];

  // Create 100 entities
  for (let i = 0; i < 100; i++) {
    actions.push(["create", { partitionKey: `one`, rowKey: `${i}`, foo: i }]);
  }
  await client.submitTransaction(actions);

  // Get the first page and limit the size to 2 entities by page
  let iterator = client.listEntities().byPage({ maxPageSize: 2 });

  let pageCount = 0;

  while (true) {
    const result = await iterator.next();
    const page: TableEntityResultPage<any> = result.value;
    if (!page.continuationToken) {
      break;
    }

    pageCount++;
    console.log(
      `Page #${pageCount} has ${page.length} entities ${page.map((p: any) => p.foo).join(", ")}`
    );

    // Manually set continuation token to be the one corresponding to the next page.
    iterator = client
      .listEntities()
      .byPage({ maxPageSize: 2, continuationToken: page.continuationToken });
  }

  console.log(`Total pages: ${pageCount}`);
}

listEntitiesPage().catch((err) => {
  console.error("The sample encountered an error:", err);
});
