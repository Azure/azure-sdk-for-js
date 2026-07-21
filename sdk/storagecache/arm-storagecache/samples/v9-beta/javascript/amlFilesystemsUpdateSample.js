// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageCacheManagementClient } = require("@azure/arm-storagecache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update an AML file system instance.
 *
 * @summary update an AML file system instance.
 * x-ms-original-file: 2026-01-01/amlFilesystems_Update.json
 */
async function amlFilesystemsUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  const result = await client.amlFilesystems.update("scgroup", "fs1", {
    encryptionSettings: {
      keyEncryptionKey: {
        keyUrl: "https://examplekv.vault.azure.net/keys/kvk/3540a47df75541378d3518c6a4bdf5af",
        sourceVault: {
          id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/scgroup/providers/Microsoft.KeyVault/vaults/keyvault-cmk",
        },
      },
    },
    maintenanceWindow: { dayOfWeek: "Friday", timeOfDayUTC: "22:00" },
    rootSquashSettings: {
      mode: "All",
      noSquashNidLists: "10.0.0.[5-6]@tcp;10.0.1.2@tcp",
      squashGID: 99,
      squashUID: 99,
    },
    tags: { Dept: "ContosoAds" },
  });
  console.log(result);
}

async function main() {
  await amlFilesystemsUpdate();
}

main().catch(console.error);
