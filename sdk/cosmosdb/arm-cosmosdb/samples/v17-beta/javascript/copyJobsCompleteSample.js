// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to completes an Online Copy Job.
 *
 * @summary completes an Online Copy Job.
 * x-ms-original-file: 2025-11-01-preview/copy-jobs/CosmosDBCopyJobComplete.json
 */
async function cosmosDBCopyJobComplete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "e35cc6eb-c8e3-447b-8de6-b83328cd0098";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.copyJobs.complete("rg1", "ddb1", "j1");
  console.log(result);
}

async function main() {
  await cosmosDBCopyJobComplete();
}

main().catch(console.error);
