// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloudClient } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update properties of the provided storage appliance, or update tags associated with the storage appliance Properties and tag updates can be done independently.
 *
 * @summary update properties of the provided storage appliance, or update tags associated with the storage appliance Properties and tag updates can be done independently.
 * x-ms-original-file: 2026-05-01-preview/StorageAppliances_Patch.json
 */
async function patchStorageAppliance() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloudClient(credential, subscriptionId);
  const result = await client.storageAppliances.update(
    "resourceGroupName",
    "storageApplianceName",
    {
      storageApplianceUpdateParameters: {
        serialNumber: "BM1219XXX",
        tags: { key1: "myvalue1", key2: "myvalue2" },
      },
    },
  );
  console.log(result);
}

async function main() {
  await patchStorageAppliance();
}

main().catch(console.error);
