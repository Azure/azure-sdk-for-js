// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to pause a Copy Job.
 *
 * @summary pause a Copy Job.
 * x-ms-original-file: 2025-11-01-preview/copy-jobs/CosmosDBCopyJobPause.json
 */
async function cosmosDBCopyJobPause() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.copyJobs.pause("rg1", "ddb1", "j1");
  console.log(result);
}

async function main() {
  await cosmosDBCopyJobPause();
}

main().catch(console.error);
