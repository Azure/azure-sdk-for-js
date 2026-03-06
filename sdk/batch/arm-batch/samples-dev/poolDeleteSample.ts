// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BatchManagementClient } from "@azure/arm-batch";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified pool.
 *
 * @summary deletes the specified pool.
 * x-ms-original-file: 2025-06-01/PoolDelete.json
 */
async function deletePool(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  await client.pool.delete("default-azurebatch-japaneast", "sampleacct", "testpool");
}

async function main(): Promise<void> {
  await deletePool();
}

main().catch(console.error);
