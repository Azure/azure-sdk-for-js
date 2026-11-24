// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DigitalAssetsClient } from "@azure/arm-digitalassets";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Partition
 *
 * @summary delete a Partition
 * x-ms-original-file: 2025-09-01-preview/Partitions_Delete.json
 */
async function deletePartition(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DigitalAssetsClient(credential, subscriptionId);
  await client.partitions.delete("testrg", "Jack", "Partition1");
}

async function main(): Promise<void> {
  await deletePartition();
}

main().catch(console.error);
