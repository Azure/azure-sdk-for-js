// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to asynchronously creates a new storage task assignment sub-resource with the specified parameters. If a storage task assignment is already created and a subsequent create request is issued with different properties, the storage task assignment properties will be updated. If a storage task assignment is already created and a subsequent create or update request is issued with the exact same set of properties, the request will succeed.
 *
 * @summary asynchronously creates a new storage task assignment sub-resource with the specified parameters. If a storage task assignment is already created and a subsequent create request is issued with different properties, the storage task assignment properties will be updated. If a storage task assignment is already created and a subsequent create or update request is issued with the exact same set of properties, the request will succeed.
 * x-ms-original-file: 2026-04-01/storageTaskAssignmentsCrud/PutStorageTaskAssignment.json
 */
async function putStorageTaskAssignment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1f31ba14-ce16-4281-b9b4-3e78da6e1616";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.storageTaskAssignments.create("res4228", "sto4445", "myassignment1", {
    properties: {
      description: "My Storage task assignment",
      enabled: true,
      executionContext: {
        target: { excludePrefix: [], prefix: ["prefix1", "prefix2"] },
        trigger: {
          type: "RunOnce",
          parameters: { startOn: new Date("2022-11-15T21:52:47.8145095Z") },
        },
      },
      report: { prefix: "container1" },
      taskId:
        "/subscriptions/1f31ba14-ce16-4281-b9b4-3e78da6e1616/resourceGroups/res4228/providers/Microsoft.StorageActions/storageTasks/mytask1",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to asynchronously creates a new storage task assignment sub-resource with the specified parameters. If a storage task assignment is already created and a subsequent create request is issued with different properties, the storage task assignment properties will be updated. If a storage task assignment is already created and a subsequent create or update request is issued with the exact same set of properties, the request will succeed.
 *
 * @summary asynchronously creates a new storage task assignment sub-resource with the specified parameters. If a storage task assignment is already created and a subsequent create request is issued with different properties, the storage task assignment properties will be updated. If a storage task assignment is already created and a subsequent create or update request is issued with the exact same set of properties, the request will succeed.
 * x-ms-original-file: 2026-04-01/storageTaskAssignmentsCrud/PutStorageTaskAssignmentMockRun.json
 */
async function putStorageTaskAssignmentMockRun(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1f31ba14-ce16-4281-b9b4-3e78da6e1616";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.storageTaskAssignments.create("res4228", "sto4445", "myassignment1", {
    properties: {
      taskId:
        "/subscriptions/1f31ba14-ce16-4281-b9b4-3e78da6e1616/resourceGroups/res4228/providers/Microsoft.StorageActions/storageTasks/myStorageTask",
      enabled: true,
      description: "My Storage task assignment for testing",
      executionContext: {
        trigger: {
          type: "MockRun",
          parameters: { startOn: new Date("2023-01-01T00:00:00.1234567Z") },
        },
        target: { prefix: [], excludePrefix: [] },
      },
      report: { prefix: "reports" },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to asynchronously creates a new storage task assignment sub-resource with the specified parameters. If a storage task assignment is already created and a subsequent create request is issued with different properties, the storage task assignment properties will be updated. If a storage task assignment is already created and a subsequent create or update request is issued with the exact same set of properties, the request will succeed.
 *
 * @summary asynchronously creates a new storage task assignment sub-resource with the specified parameters. If a storage task assignment is already created and a subsequent create request is issued with different properties, the storage task assignment properties will be updated. If a storage task assignment is already created and a subsequent create or update request is issued with the exact same set of properties, the request will succeed.
 * x-ms-original-file: 2026-04-01/storageTaskAssignmentsCrud/PutStorageTaskAssignmentRequiredProperties.json
 */
async function putStorageTaskAssignmentRequiredProperties(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1f31ba14-ce16-4281-b9b4-3e78da6e1616";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.storageTaskAssignments.create("res4228", "sto4445", "myassignment1", {
    properties: {
      description: "My Storage task assignment",
      enabled: true,
      executionContext: {
        trigger: {
          type: "RunOnce",
          parameters: { startOn: new Date("2022-11-15T21:52:47.8145095Z") },
        },
      },
      report: { prefix: "container1" },
      taskId:
        "/subscriptions/1f31ba14-ce16-4281-b9b4-3e78da6e1616/resourceGroups/res4228/providers/Microsoft.StorageActions/storageTasks/mytask1",
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await putStorageTaskAssignment();
  await putStorageTaskAssignmentMockRun();
  await putStorageTaskAssignmentRequiredProperties();
}

main().catch(console.error);
