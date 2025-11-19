// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedNetworkFabricClient } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to upgrades the version of the Network Device.
 *
 * @summary upgrades the version of the Network Device.
 * x-ms-original-file: 2024-06-15-preview/NetworkDevices_Upgrade.json
 */
async function networkDevicesUpgradeMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.networkDevices.upgrade("example-rg", "example-device", {
    version: "1.0.0",
  });
  console.log(result);
}

async function main() {
  await networkDevicesUpgradeMaximumSetGen();
}

main().catch(console.error);
