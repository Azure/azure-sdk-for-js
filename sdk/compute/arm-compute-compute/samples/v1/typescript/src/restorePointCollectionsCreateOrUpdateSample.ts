// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to create or update the restore point collection. Please refer to https://aka.ms/RestorePoints for more details. When updating a restore point collection, only tags may be modified.
 *
 * @summary the operation to create or update the restore point collection. Please refer to https://aka.ms/RestorePoints for more details. When updating a restore point collection, only tags may be modified.
 * x-ms-original-file: 2025-04-01/restorePointExamples/RestorePointCollection_CreateOrUpdate.json
 */
async function createOrUpdateARestorePointCollection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.restorePointCollections.createOrUpdate("myResourceGroup", "myRpc", {
    location: "norwayeast",
    properties: {
      source: {
        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/virtualMachines/myVM",
      },
    },
    tags: { myTag1: "tagValue1" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to create or update the restore point collection. Please refer to https://aka.ms/RestorePoints for more details. When updating a restore point collection, only tags may be modified.
 *
 * @summary the operation to create or update the restore point collection. Please refer to https://aka.ms/RestorePoints for more details. When updating a restore point collection, only tags may be modified.
 * x-ms-original-file: 2025-04-01/restorePointExamples/RestorePointCollection_CreateOrUpdate_ForCrossRegionCopy.json
 */
async function createOrUpdateARestorePointCollectionForCrossRegionCopy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.restorePointCollections.createOrUpdate("myResourceGroup", "myRpc", {
    location: "norwayeast",
    properties: {
      source: {
        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/restorePointCollections/sourceRpcName",
      },
    },
    tags: { myTag1: "tagValue1" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateARestorePointCollection();
  await createOrUpdateARestorePointCollectionForCrossRegionCopy();
}

main().catch(console.error);
