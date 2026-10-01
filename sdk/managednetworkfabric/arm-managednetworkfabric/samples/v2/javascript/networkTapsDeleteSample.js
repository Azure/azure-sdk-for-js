// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureNetworkFabricManagementServiceAPI } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes Network Tap.
 *
 * @summary deletes Network Tap.
 * x-ms-original-file: 2025-07-15/NetworkTaps_Delete.json
 */
async function networkTapsDeleteMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  await client.networkTaps.delete("example-rg", "example-networkTap");
}

async function main() {
  await networkTapsDeleteMaximumSetGen();
}

main().catch(console.error);
