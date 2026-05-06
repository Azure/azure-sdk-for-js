// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloudClient } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to disable remote vendor management of the provided storage appliance.
 *
 * @summary disable remote vendor management of the provided storage appliance.
 * x-ms-original-file: 2026-05-01-preview/StorageAppliances_DisableRemoteVendorManagement.json
 */
async function turnOffRemoteVendorManagementForStorageAppliance() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloudClient(credential, subscriptionId);
  const result = await client.storageAppliances.disableRemoteVendorManagement(
    "resourceGroupName",
    "storageApplianceName",
  );
  console.log(result);
}

async function main() {
  await turnOffRemoteVendorManagementForStorageAppliance();
}

main().catch(console.error);
