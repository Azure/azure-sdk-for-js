// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Completes an Online Copy Job.
 *
 * @summary Completes an Online Copy Job.
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/preview/2025-11-01-preview/examples/copy-jobs/CosmosDBCopyJobComplete.json
 */
async function cosmosDbCopyJobComplete() {
  const subscriptionId =
    process.env["COSMOSDB_SUBSCRIPTION_ID"] || "e35cc6eb-c8e3-447b-8de6-b83328cd0098";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rg1";
  const accountName = "ddb1";
  const jobName = "j1";
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.copyJobs.complete(resourceGroupName, accountName, jobName);
  console.log(result);
}

async function main() {
  await cosmosDbCopyJobComplete();
}

main().catch(console.error);
