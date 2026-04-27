// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a list of Data Transfer jobs.
 *
 * @summary get a list of Data Transfer jobs.
 * x-ms-original-file: 2025-11-01-preview/data-transfer-service/CosmosDBDataTransferJobFeed.json
 */
async function cosmosDBDataTransferJobFeed() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dataTransferJobs.listByDatabaseAccount("rg1", "ddb1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await cosmosDBDataTransferJobFeed();
}

main().catch(console.error);
