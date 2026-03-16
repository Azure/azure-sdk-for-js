// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to check for updates
 *
 * @summary check for updates
 * x-ms-original-file: 2026-03-01-preview/UpdateSummaries_CheckUpdates.json
 */
async function checkForUpdates(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "b8d594e5-51f3-4c11-9c54-a7771b81c712";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  await client.updateSummariesOperationGroup.checkUpdates("testrg", "testcluster", {});
}

/**
 * This sample demonstrates how to check for updates
 *
 * @summary check for updates
 * x-ms-original-file: 2026-03-01-preview/UpdateSummaries_CheckUpdates_MaximumSet.json
 */
async function checkForSpecificUpdateByName(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "b8d594e5-51f3-4c11-9c54-a7771b81c712";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  await client.updateSummariesOperationGroup.checkUpdates("testrg", "testcluster", {
    updateName: "Microsoft4.2203.2.32",
  });
}

async function main(): Promise<void> {
  await checkForUpdates();
  await checkForSpecificUpdateByName();
}

main().catch(console.error);
