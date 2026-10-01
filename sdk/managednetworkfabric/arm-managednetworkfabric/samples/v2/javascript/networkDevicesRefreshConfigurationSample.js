// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureNetworkFabricManagementServiceAPI } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to refreshes the configuration the Network Device.
 *
 * @summary refreshes the configuration the Network Device.
 * x-ms-original-file: 2025-07-15/NetworkDevices_RefreshConfiguration.json
 */
async function networkDevicesRefreshConfigurationMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.networkDevices.refreshConfiguration("example-rg", "example-device");
  console.log(result);
}

async function main() {
  await networkDevicesRefreshConfigurationMaximumSetGen();
}

main().catch(console.error);
