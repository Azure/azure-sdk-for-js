// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIVMManagementClient } from "@azure/arm-azurestackhcivm";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a snapshot
 *
 * @summary gets a snapshot
 * x-ms-original-file: 2026-04-01-preview/Snapshots_Get.json
 */
async function getASnapshot(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIVMManagementClient(credential, subscriptionId);
  const result = await client.snapshots.get("test-rg", "test-snapshot");
  console.log(result);
}

async function main(): Promise<void> {
  await getASnapshot();
}

main().catch(console.error);
