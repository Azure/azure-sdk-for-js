// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageActionsManagementClient } from "@azure/arm-storageactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to asynchronously creates a new storage task resource with the specified parameters. If a storage task is already created and a subsequent create request is issued with different properties, the storage task properties will be updated. If a storage task is already created and a subsequent create or update request is issued with the exact same set of properties, the request will succeed.
 *
 * @summary asynchronously creates a new storage task resource with the specified parameters. If a storage task is already created and a subsequent create request is issued with different properties, the storage task properties will be updated. If a storage task is already created and a subsequent create or update request is issued with the exact same set of properties, the request will succeed.
 * x-ms-original-file: 2023-01-01/storageTasksCrud/PutStorageTask.json
 */
async function putStorageTask(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1f31ba14-ce16-4281-b9b4-3e78da6e1616";
  const client = new StorageActionsManagementClient(credential, subscriptionId);
  const result = await client.storageTasks.create("res4228", "mytask1", {
    identity: { type: "SystemAssigned" },
    location: "westus",
    properties: {
      description: "My Storage task",
      action: {
        else: {
          operations: [{ name: "DeleteBlob", onFailure: "break", onSuccess: "continue" }],
        },
        if: {
          condition: "[[equals(AccessTier, 'Cool')]]",
          operations: [
            {
              name: "SetBlobTier",
              onFailure: "break",
              onSuccess: "continue",
              parameters: { tier: "Hot" },
            },
          ],
        },
      },
      enabled: true,
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await putStorageTask();
}

main().catch(console.error);
