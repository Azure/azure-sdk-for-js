// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Pause a Copy Job.
 *
 * @summary Pause a Copy Job.
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/preview/2025-11-01-preview/examples/copy-jobs/CosmosDBCopyJobPause.json
 */
async function cosmosDbCopyJobPause() {
  const subscriptionId = process.env["COSMOSDB_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rg1";
  const accountName = "ddb1";
  const jobName = "j1";
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.copyJobs.pause(resourceGroupName, accountName, jobName);
  console.log(result);
}

async function main() {
  await cosmosDbCopyJobPause();
}

main().catch(console.error);
