// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloud } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get properties of the provided storage appliance.
 *
 * @summary get properties of the provided storage appliance.
 * x-ms-original-file: 2026-05-01-preview/StorageAppliances_Get.json
 */
async function getStorageAppliance() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.storageAppliances.get("resourceGroupName", "storageApplianceName");
  console.log(result);
}

async function main() {
  await getStorageAppliance();
}

main().catch(console.error);
