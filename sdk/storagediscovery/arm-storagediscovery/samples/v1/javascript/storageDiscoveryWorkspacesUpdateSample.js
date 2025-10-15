// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageDiscoveryClient } = require("@azure/arm-storagediscovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a StorageDiscoveryWorkspace
 *
 * @summary update a StorageDiscoveryWorkspace
 * x-ms-original-file: 2025-09-01/StorageDiscoveryWorkspaces_Update.json
 */
async function updateAStorageDiscoveryWorkspace() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "b79cb3ba-745e-5d9a-8903-4a02327a7e09";
  const client = new StorageDiscoveryClient(credential, subscriptionId);
  const result = await client.storageDiscoveryWorkspaces.update(
    "sample-rg",
    "Sample-Storage-Workspace",
    {
      properties: {
        sku: "Free",
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

async function main() {
  await updateAStorageDiscoveryWorkspace();
}

main().catch(console.error);
