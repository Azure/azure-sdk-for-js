// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageCacheManagementClient } from "@azure/arm-storagecache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update an AML file system.
 *
 * @summary create or update an AML file system.
 * x-ms-original-file: 2026-01-01/amlFilesystems_CreateOrUpdate.json
 */
async function amlFilesystemsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  const result = await client.amlFilesystems.createOrUpdate("scgroup", "fs1", {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/scgroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/identity1":
          {},
      },
    },
    location: "eastus",
    encryptionSettings: {
      keyEncryptionKey: {
        keyUrl: "https://examplekv.vault.azure.net/keys/kvk/3540a47df75541378d3518c6a4bdf5af",
        sourceVault: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/scgroup/providers/Microsoft.KeyVault/vaults/keyvault-cmk",
        },
      },
    },
    filesystemSubnet:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/scgroup/providers/Microsoft.Network/virtualNetworks/scvnet/subnets/fsSub",
    hsm: {
      settings: {
        container:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/scgroup/providers/Microsoft.Storage/storageAccounts/storageaccountname/blobServices/default/containers/containername",
        importPrefixesInitial: ["/"],
        loggingContainer:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/scgroup/providers/Microsoft.Storage/storageAccounts/storageaccountname/blobServices/default/containers/loggingcontainername",
      },
    },
    maintenanceWindow: { dayOfWeek: "Friday", timeOfDayUTC: "22:00" },
    rootSquashSettings: {
      mode: "All",
      noSquashNidLists: "10.0.0.[5-6]@tcp;10.0.1.2@tcp",
      squashGID: 99,
      squashUID: 99,
    },
    storageCapacityTiB: 16,
    sku: { name: "AMLFS-Durable-Premium-250" },
    tags: { Dept: "ContosoAds" },
    zones: ["1"],
  });
  console.log(result);
}

async function main(): Promise<void> {
  await amlFilesystemsCreateOrUpdate();
}

main().catch(console.error);
