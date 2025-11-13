// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedNetworkFabricClient } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the Network Interface resource details.
 *
 * @summary get the Network Interface resource details.
 * x-ms-original-file: 2024-06-15-preview/NetworkInterfaces_Get.json
 */
async function networkInterfacesGetMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.networkInterfaces.get(
    "example-rg",
    "example-device",
    "example-interface",
  );
  console.log(result);
}

async function main() {
  await networkInterfacesGetMaximumSetGen();
}

main().catch(console.error);
