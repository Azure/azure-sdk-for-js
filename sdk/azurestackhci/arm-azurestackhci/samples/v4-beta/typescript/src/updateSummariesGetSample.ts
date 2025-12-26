// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get all Update summaries under the HCI cluster
 *
 * @summary get all Update summaries under the HCI cluster
 * x-ms-original-file: 2025-12-01-preview/GetUpdateSummaries.json
 */
async function getUpdateSummariesUnderClusterResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "b8d594e5-51f3-4c11-9c54-a7771b81c712";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.updateSummaries.get("testrg", "testcluster");
  console.log(result);
}

async function main(): Promise<void> {
  await getUpdateSummariesUnderClusterResource();
}

main().catch(console.error);
