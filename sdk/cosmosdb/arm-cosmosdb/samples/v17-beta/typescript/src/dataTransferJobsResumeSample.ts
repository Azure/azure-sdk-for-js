// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Resumes a Data Transfer Job.
 *
 * @summary Resumes a Data Transfer Job.
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/preview/2025-11-01-preview/examples/data-transfer-service/CosmosDBDataTransferJobResume.json
 */
async function cosmosDbDataTransferJobResume(): Promise<void> {
  const subscriptionId = process.env["COSMOSDB_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rg1";
  const accountName = "ddb1";
  const jobName = "j1";
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.dataTransferJobs.resume(
    resourceGroupName,
    accountName,
    jobName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDbDataTransferJobResume();
}

main().catch(console.error);
