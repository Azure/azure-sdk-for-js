// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedNetworkFabricClient } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to reboot the Network Device.
 *
 * @summary reboot the Network Device.
 * x-ms-original-file: 2024-06-15-preview/NetworkDevices_Reboot.json
 */
async function networkDevicesRebootMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.networkDevices.reboot("example-rg", "example-device", {
    rebootType: "GracefulRebootWithZTP",
  });
  console.log(result);
}

async function main() {
  await networkDevicesRebootMaximumSetGen();
}

main().catch(console.error);
