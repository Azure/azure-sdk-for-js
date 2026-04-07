// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BatchManagementClient } from "@azure/arm-batch";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to disables automatic scaling for a pool.
 *
 * @summary disables automatic scaling for a pool.
 * x-ms-original-file: 2025-06-01/PoolDisableAutoScale.json
 */
async function disableAutoScale(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  const result = await client.pool.disableAutoScale(
    "default-azurebatch-japaneast",
    "sampleacct",
    "testpool",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await disableAutoScale();
}

main().catch(console.error);
