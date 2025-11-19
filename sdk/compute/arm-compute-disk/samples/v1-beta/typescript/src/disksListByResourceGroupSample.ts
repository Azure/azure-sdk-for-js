// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-disk";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all the disks under a resource group.
 *
 * @summary lists all the disks under a resource group.
 * x-ms-original-file: 2025-01-02/diskExamples/Disk_ListByResourceGroup.json
 */
async function listAllManagedDisksInAResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.disks.listByResourceGroup("myResourceGroup")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAllManagedDisksInAResourceGroup();
}

main().catch(console.error);
