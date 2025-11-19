// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedNetworkFabricClient } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to implements InternalNetworks DELETE method.
 *
 * @summary implements InternalNetworks DELETE method.
 * x-ms-original-file: 2024-06-15-preview/InternalNetworks_Delete.json
 */
async function internalNetworksDeleteMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  await client.internalNetworks.delete("example-rg", "example-l3isd", "example-internalnetwork");
}

async function main() {
  await internalNetworksDeleteMaximumSetGen();
}

main().catch(console.error);
