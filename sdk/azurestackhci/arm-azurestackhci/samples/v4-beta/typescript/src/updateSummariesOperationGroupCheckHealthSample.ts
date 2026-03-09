// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to check health of UpdateSummaries
 *
 * @summary check health of UpdateSummaries
 * x-ms-original-file: 2026-03-01-preview/UpdateSummaries_CheckHealth.json
 */
async function checkHealthOfUpdateSummaries(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "b8d594e5-51f3-4c11-9c54-a7771b81c712";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  await client.updateSummariesOperationGroup.checkHealth("testrg", "testcluster");
}

async function main(): Promise<void> {
  await checkHealthOfUpdateSummaries();
}

main().catch(console.error);
