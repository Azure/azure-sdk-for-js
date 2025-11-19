// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedNetworkFabricClient } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the Network Device resource details.
 *
 * @summary gets the Network Device resource details.
 * x-ms-original-file: 2024-06-15-preview/NetworkDevices_Get.json
 */
async function networkDevicesGetMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.networkDevices.get("example-rg", "example-device");
  console.log(result);
}

async function main() {
  await networkDevicesGetMaximumSetGen();
}

main().catch(console.error);
