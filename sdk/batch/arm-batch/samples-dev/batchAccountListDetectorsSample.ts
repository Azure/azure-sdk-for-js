// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BatchManagementClient } from "@azure/arm-batch";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets information about the detectors available for a given Batch account.
 *
 * @summary gets information about the detectors available for a given Batch account.
 * x-ms-original-file: 2025-06-01/DetectorList.json
 */
async function listDetectors(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.batchAccount.listDetectors(
    "default-azurebatch-japaneast",
    "sampleacct",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listDetectors();
}

main().catch(console.error);
