// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/**
 * This sample demonstrates how to query entities in a table by page by manually handling the continuation token
 *
 * @summary queries entities in a table by page manually handling continuation tokens
 */

const { TableClient, AzureSASCredential } = require("@azure/data-tables");

// Load the .env file if it exists
const dotenv = require("dotenv");
dotenv.config();

const tablesUrl = process.env["TABLES_URL"] || "";
const sasToken = process.env["SAS_TOKEN"] || "";

async function usingContinuationToken() {
  const tableName = `manualListByPage`;

  // See authenticationMethods sample for other options of creating a new client
  const client = new TableClient(tablesUrl, tableName, new AzureSASCredential(sasToken));
  // Create the table
  await client.createTable();

  let actions = [];

  // Create 100 entities
  for (let i = 0; i < 100; i++) {
    actions.push(["create", { partitionKey: `one`, rowKey: `${i}`, foo: i }]);
  }
  await client.submitTransaction(actions);

  // Limit the size to 2 entities by page
  let iterator = client.listEntities().byPage({ maxPageSize: 2 });

  // Iterating the pages to find the page that contains row key 50
  let interestingPage;
  for await (const page of iterator) {
    if (page.some((p) => p.rowKey === "50")) {
      interestingPage = page.continuationToken;
    }
  }

  if (!interestingPage) {
    console.error("Didn't find entity with rowKey = 50");
    return;
  }

  // Fetch only the page that contains rowKey 50;
  const page = await client
    .listEntities()
    .byPage({ maxPageSize: 2, continuationToken: interestingPage })
    .next();

  if (!page.done) {
    for (const entity of page.value) {
      console.log(entity.rowKey);
    }
  }
}

usingContinuationToken().catch((err) => {
  console.error("The sample encountered an error:", err);
});
