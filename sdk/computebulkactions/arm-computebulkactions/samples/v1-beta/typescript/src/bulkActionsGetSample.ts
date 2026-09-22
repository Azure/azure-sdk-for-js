// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeBulkActionsClient } from "@azure/arm-computebulkactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets an instance of LaunchBulkInstancesOperations.
 *
 * @summary gets an instance of LaunchBulkInstancesOperations.
 * x-ms-original-file: 2026-02-01-preview/BulkActions_Get_MaximumSet_Gen.json
 */
async function bulkActionsGetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "50352BBD-59F1-4EE2-BA9C-A6E51B0B1B2B";
  const client = new ComputeBulkActionsClient(credential, subscriptionId);
  const result = await client.bulkActions.get(
    "rgcomputebulkactions",
    "eastus2euap",
    "3ec2ab23-9f13-4328-85c8-21928acbc7b8",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await bulkActionsGetGeneratedByMaximumSetRule();
}

main().catch(console.error);
