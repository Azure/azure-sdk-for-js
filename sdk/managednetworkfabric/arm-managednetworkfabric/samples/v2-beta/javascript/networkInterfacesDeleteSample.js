// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedNetworkFabricClient } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete the Network Interface resource.
 *
 * @summary delete the Network Interface resource.
 * x-ms-original-file: 2024-06-15-preview/NetworkInterfaces_Delete.json
 */
async function networkInterfacesDeleteMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  await client.networkInterfaces.delete("example-rg", "example-device", "example-interface");
}

async function main() {
  await networkInterfacesDeleteMaximumSetGen();
}

main().catch(console.error);
