// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedNetworkFabricClient } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes Network Tap.
 *
 * @summary deletes Network Tap.
 * x-ms-original-file: 2024-06-15-preview/NetworkTaps_Delete.json
 */
async function networkTapsDeleteMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  await client.networkTaps.delete("example-rg", "example-networkTap");
}

async function main() {
  await networkTapsDeleteMaximumSetGen();
}

main().catch(console.error);
