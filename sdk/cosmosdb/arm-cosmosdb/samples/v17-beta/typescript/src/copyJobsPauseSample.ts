// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to pause a Copy Job.
 *
 * @summary pause a Copy Job.
 * x-ms-original-file: 2025-11-01-preview/copy-jobs/CosmosDBCopyJobPause.json
 */
async function cosmosDBCopyJobPause(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.copyJobs.pause("rg1", "ddb1", "j1");
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDBCopyJobPause();
}

main().catch(console.error);
