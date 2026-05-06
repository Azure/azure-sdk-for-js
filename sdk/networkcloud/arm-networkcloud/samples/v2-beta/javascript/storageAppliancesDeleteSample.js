// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloudClient } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete the provided storage appliance. All customer initiated requests will be rejected as the life cycle of this resource is managed by the system.
 *
 * @summary delete the provided storage appliance. All customer initiated requests will be rejected as the life cycle of this resource is managed by the system.
 * x-ms-original-file: 2026-05-01-preview/StorageAppliances_Delete.json
 */
async function deleteStorageAppliance() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloudClient(credential, subscriptionId);
  const result = await client.storageAppliances.delete("resourceGroupName", "storageApplianceName");
  console.log(result);
}

async function main() {
  await deleteStorageAppliance();
}

main().catch(console.error);
