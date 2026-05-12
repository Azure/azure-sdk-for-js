// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIVMManagementClient } from "@azure/arm-azurestackhcivm";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to update a snapshot.
 *
 * @summary the operation to update a snapshot.
 * x-ms-original-file: 2026-04-01-preview/Snapshots_Update.json
 */
async function updateASnapshot(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIVMManagementClient(credential, subscriptionId);
  const result = await client.snapshots.update("test-rg", "test-snapshot", {
    tags: { environment: "production", tier: "standard" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateASnapshot();
}

main().catch(console.error);
