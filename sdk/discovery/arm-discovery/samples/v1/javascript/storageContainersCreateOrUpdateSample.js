// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DiscoveryClient } = require("@azure/arm-discovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a StorageContainer
 *
 * @summary create a StorageContainer
 * x-ms-original-file: 2026-06-01/StorageContainers_CreateOrUpdate_MaximumSet_Gen.json
 */
async function storageContainersCreateOrUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "A54D43BD-2F5F-4BB1-95D4-9A8D23CC7DD4";
  const client = new DiscoveryClient(credential, subscriptionId);
  const result = await client.storageContainers.createOrUpdate(
    "rgdiscovery",
    "49af599cddb38a473b",
    {
      properties: {
        storageStore: {
          kind: "AzureStorageBlob",
          storageAccountId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg/providers/Microsoft.Storage/storageAccounts/storageaccount",
          mountProtocol: "NFS",
        },
      },
      tags: { key4240: "omppnvnqh" },
      location: "uksouth",
    },
  );
  console.log(result);
}

async function main() {
  await storageContainersCreateOrUpdateMaximumSet();
}

main().catch(console.error);
