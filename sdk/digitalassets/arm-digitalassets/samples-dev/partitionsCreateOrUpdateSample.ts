// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DigitalAssetsClient } from "@azure/arm-digitalassets";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or replaces a partition.
 *
 * @summary creates or replaces a partition.
 * x-ms-original-file: 2025-09-01-preview/Partitions_CreateOrUpdate.json
 */
async function createPartition(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DigitalAssetsClient(credential, subscriptionId);
  const result = await client.partitions.createOrUpdate("testrg", "Jack", "Partition1", {
    location: "eastus",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createPartition();
}

main().catch(console.error);
