// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BatchManagementClient } from "@azure/arm-batch";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets information about the given detector for a given Batch account.
 *
 * @summary gets information about the given detector for a given Batch account.
 * x-ms-original-file: 2025-06-01/DetectorGet.json
 */
async function getDetector(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  const result = await client.batchAccount.getDetector(
    "default-azurebatch-japaneast",
    "sampleacct",
    "poolsAndNodes",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getDetector();
}

main().catch(console.error);
