// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to completes a Data Transfer Online Job.
 *
 * @summary completes a Data Transfer Online Job.
 * x-ms-original-file: 2025-11-01-preview/data-transfer-service/CosmosDBDataTransferJobComplete.json
 */
async function cosmosDBDataTransferJobComplete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "e35cc6eb-c8e3-447b-8de6-b83328cd0098";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.dataTransferJobs.complete("rg1", "ddb1", "j1");
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDBDataTransferJobComplete();
}

main().catch(console.error);
