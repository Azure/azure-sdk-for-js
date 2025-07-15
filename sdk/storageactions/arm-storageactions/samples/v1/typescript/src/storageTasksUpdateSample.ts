// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageActionsManagementClient } from "@azure/arm-storageactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update storage task properties
 *
 * @summary update storage task properties
 * x-ms-original-file: 2023-01-01/storageTasksCrud/PatchStorageTask.json
 */
async function patchStorageTask(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1f31ba14-ce16-4281-b9b4-3e78da6e1616";
  const client = new StorageActionsManagementClient(credential, subscriptionId);
  const result = await client.storageTasks.update("res4228", "mytask1", {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/1f31ba14-ce16-4281-b9b4-3e78da6e1616/resourceGroups/res4228/providers/Microsoft.ManagedIdentity/userAssignedIdentities/myUserAssignedIdentity":
          {},
      },
    },
    properties: {
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
  await patchStorageTask();
}

main().catch(console.error);
