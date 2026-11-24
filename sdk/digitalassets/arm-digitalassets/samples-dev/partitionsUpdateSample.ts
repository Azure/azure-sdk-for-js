// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DigitalAssetsClient } from "@azure/arm-digitalassets";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a Partition
 *
 * @summary update a Partition
 * x-ms-original-file: 2025-09-01-preview/Partitions_Update.json
 */
async function updatePartition(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DigitalAssetsClient(credential, subscriptionId);
  const result = await client.partitions.update("testrg", "Jack", "Partition1", {
    tags: { env: "test" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updatePartition();
}

main().catch(console.error);
