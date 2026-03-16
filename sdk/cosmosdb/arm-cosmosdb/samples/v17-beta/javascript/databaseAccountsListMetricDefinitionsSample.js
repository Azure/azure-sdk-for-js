// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves metric definitions for the given database account.
 *
 * @summary retrieves metric definitions for the given database account.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBDatabaseAccountGetMetricDefinitions.json
 */
async function cosmosDBDatabaseAccountGetMetricDefinitions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.databaseAccounts.listMetricDefinitions("rg1", "ddb1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await cosmosDBDatabaseAccountGetMetricDefinitions();
}

main().catch(console.error);
