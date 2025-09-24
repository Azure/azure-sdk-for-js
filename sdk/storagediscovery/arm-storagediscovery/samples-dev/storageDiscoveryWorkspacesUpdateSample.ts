// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to update a StorageDiscoveryWorkspace
 *
 * @summary update a StorageDiscoveryWorkspace
 * x-ms-original-file: 2025-06-01-preview/StorageDiscoveryWorkspaces_Update.json
 */

import { StorageDiscoveryClient } from "@azure/arm-storagediscovery";
import { DefaultAzureCredential } from "@azure/identity";

async function updateAStorageDiscoveryWorkspace(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "b79cb3ba-745e-5d9a-8903-4a02327a7e09";
  const client = new StorageDiscoveryClient(credential, subscriptionId);
  const result = await client.storageDiscoveryWorkspaces.update(
    "sample-rg",
    "Sample-Storage-Workspace",
    {
      properties: {
        sku: "Premium",
        workspaceRoots: ["/subscriptions/b79cb3ba-745e-5d9a-8903-4a02327a7e09"],
        description: "Updated Sample Storage Discovery Workspace",
        scopes: [
          {
            displayName: "Updated-Sample-Collection",
            resourceTypes: [
              "/subscriptions/b79cb3ba-745e-5d9a-8903-4a02327a7e09/resourceGroups/sample-rg/providers/Microsoft.Storage/storageAccounts/updated-sample-storageAccount",
            ],
            tagKeysOnly: ["updated-filtertag1", "updated-filtertag2"],
            tags: {
              "updated-filtertag3": "updated-value3",
              "updated-filtertag4": "updated-value4",
            },
          },
        ],
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateAStorageDiscoveryWorkspace();
}

main().catch(console.error);
