// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BatchManagementClient } from "@azure/arm-batch";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets information about the specified Batch account.
 *
 * @summary gets information about the specified Batch account.
 * x-ms-original-file: 2025-06-01/BatchAccountGet.json
 */
async function batchAccountGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  const result = await client.batchAccount.get("default-azurebatch-japaneast", "sampleacct");
  console.log(result);
}

/**
 * This sample demonstrates how to gets information about the specified Batch account.
 *
 * @summary gets information about the specified Batch account.
 * x-ms-original-file: 2025-06-01/PrivateBatchAccountGet.json
 */
async function privateBatchAccountGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  const result = await client.batchAccount.get("default-azurebatch-japaneast", "sampleacct");
  console.log(result);
}

async function main(): Promise<void> {
  await batchAccountGet();
  await privateBatchAccountGet();
}

main().catch(console.error);
