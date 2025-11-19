// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-disk";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all the disks under a subscription.
 *
 * @summary lists all the disks under a subscription.
 * x-ms-original-file: 2025-01-02/diskExamples/Disk_ListBySubscription.json
 */
async function listAllManagedDisksInASubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.disks.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAllManagedDisksInASubscription();
}

main().catch(console.error);
