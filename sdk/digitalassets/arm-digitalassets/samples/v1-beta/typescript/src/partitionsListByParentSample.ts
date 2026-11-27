// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DigitalAssetsClient } from "@azure/arm-digitalassets";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list Partition resources by ZkpRollup
 *
 * @summary list Partition resources by ZkpRollup
 * x-ms-original-file: 2025-09-01-preview/Partitions_ListByParent.json
 */
async function listPartitionsByParent(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DigitalAssetsClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.partitions.listByParent("testrg", "Jack")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listPartitionsByParent();
}

main().catch(console.error);
