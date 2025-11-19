// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedNetworkFabricClient } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to run the RW Command on the Network Device.
 *
 * @summary run the RW Command on the Network Device.
 * x-ms-original-file: 2024-06-15-preview/NetworkDevices_RunRwCommand.json
 */
async function networkDevicesRunRwCommandMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.networkDevices.runRwCommand("example-rg", "example-device", {
    command: "yzuabghycngqmqtfacvoh",
  });
  console.log(result);
}

async function main() {
  await networkDevicesRunRwCommandMaximumSetGen();
}

main().catch(console.error);
