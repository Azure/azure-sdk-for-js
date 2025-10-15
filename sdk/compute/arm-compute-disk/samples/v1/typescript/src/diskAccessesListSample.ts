// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-disk";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all the disk access resources under a subscription.
 *
 * @summary lists all the disk access resources under a subscription.
 * x-ms-original-file: 2025-01-02/diskAccessExamples/DiskAccess_ListBySubscription.json
 */
async function listAllDiskAccessResourcesInASubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.diskAccesses.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAllDiskAccessResourcesInASubscription();
}

main().catch(console.error);
