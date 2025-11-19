// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedNetworkFabricClient } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete Network Fabric resource.
 *
 * @summary delete Network Fabric resource.
 * x-ms-original-file: 2024-06-15-preview/NetworkFabrics_Delete.json
 */
async function networkFabricsDeleteMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  await client.networkFabrics.delete("example-rg", "example-fabric");
}

async function main() {
  await networkFabricsDeleteMaximumSetGen();
}

main().catch(console.error);
