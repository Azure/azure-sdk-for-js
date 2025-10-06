// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageDiscoveryClient } from "@azure/arm-storagediscovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a StorageDiscoveryWorkspace
 *
 * @summary create a StorageDiscoveryWorkspace
 * x-ms-original-file: 2025-09-01/StorageDiscoveryWorkspaces_CreateOrUpdate.json
 */
async function createOrUpdateAStorageDiscoveryWorkspace(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "b79cb3ba-745e-5d9a-8903-4a02327a7e09";
  const client = new StorageDiscoveryClient(credential, subscriptionId);
  const result = await client.storageDiscoveryWorkspaces.createOrUpdate(
    "sample-rg",
    "Sample-Storage-Workspace",
    {
      location: "westeurope",
      tags: { tag1: "value1", tag2: "value2" },
      properties: {
        workspaceRoots: ["/subscriptions/b79cb3ba-745e-5d9a-8903-4a02327a7e09"],
        description: "Sample Storage Discovery Workspace",
        scopes: [
          {
            displayName: "Sample-Collection",
            resourceTypes: [
              "/subscriptions/b79cb3ba-745e-5d9a-8903-4a02327a7e09/resourceGroups/sample-rg/providers/Microsoft.Storage/storageAccounts/sample-storageAccount",
            ],
            tagKeysOnly: ["filterTag1", "filterTag2"],
            tags: { filterTag3: "value3", filterTag4: "value4" },
          },
          {
            displayName: "Sample-Collection-2",
            resourceTypes: [
              "/subscriptions/b79cb3ba-745e-5d9a-8903-4a02327a7e09/resourceGroups/sample-rg/providers/Microsoft.Storage/storageAccounts/sample-storageAccount",
            ],
            tagKeysOnly: ["filterTag5"],
            tags: { filterTag6: "value6" },
          },
        ],
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateAStorageDiscoveryWorkspace();
}

main().catch(console.error);
