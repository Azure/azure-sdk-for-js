// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedNetworkFabricClient } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete Network Rack resource.
 *
 * @summary delete Network Rack resource.
 * x-ms-original-file: 2024-06-15-preview/NetworkRacks_Delete.json
 */
async function networkRacksDeleteMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  await client.networkRacks.delete("example-rg", "example-rack");
}

async function main() {
  await networkRacksDeleteMaximumSetGen();
}

main().catch(console.error);
