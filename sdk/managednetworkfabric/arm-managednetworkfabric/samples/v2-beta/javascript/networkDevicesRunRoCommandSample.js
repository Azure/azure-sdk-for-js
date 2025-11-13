// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedNetworkFabricClient } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to run the RO Command on the Network Device.
 *
 * @summary run the RO Command on the Network Device.
 * x-ms-original-file: 2024-06-15-preview/NetworkDevices_RunRoCommand.json
 */
async function networkDevicesRunRoCommandMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.networkDevices.runRoCommand("example-rg", "example-device", {
    command: "show version",
  });
  console.log(result);
}

async function main() {
  await networkDevicesRunRoCommandMaximumSetGen();
}

main().catch(console.error);
