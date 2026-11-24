// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DigitalAssetsClient } from "@azure/arm-digitalassets";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a Partition
 *
 * @summary get a Partition
 * x-ms-original-file: 2025-09-01-preview/Partitions_Get.json
 */
async function getPartition(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DigitalAssetsClient(credential, subscriptionId);
  const result = await client.partitions.get("testrg", "Jack", "Partition1");
  console.log(result);
}

async function main(): Promise<void> {
  await getPartition();
}

main().catch(console.error);
