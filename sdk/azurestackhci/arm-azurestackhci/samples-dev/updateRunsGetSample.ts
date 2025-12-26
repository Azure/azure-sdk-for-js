// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the Update run for a specified update
 *
 * @summary get the Update run for a specified update
 * x-ms-original-file: 2025-12-01-preview/GetUpdateRuns.json
 */
async function getUpdateRunsUnderClusterResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "b8d594e5-51f3-4c11-9c54-a7771b81c712";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.updateRuns.get(
    "testrg",
    "testcluster",
    "Microsoft4.2203.2.32",
    "23b779ba-0d52-4a80-8571-45ca74664ec3",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getUpdateRunsUnderClusterResource();
}

main().catch(console.error);
