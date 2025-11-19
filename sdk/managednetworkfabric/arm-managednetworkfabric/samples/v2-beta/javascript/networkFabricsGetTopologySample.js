// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedNetworkFabricClient } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets Topology of the underlying resources in the given Network Fabric instance.
 *
 * @summary gets Topology of the underlying resources in the given Network Fabric instance.
 * x-ms-original-file: 2024-06-15-preview/NetworkFabrics_GetTopology.json
 */
async function networkFabricsGetTopologyMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.networkFabrics.getTopology("example-rg", "example-fabric");
  console.log(result);
}

async function main() {
  await networkFabricsGetTopologyMaximumSetGen();
}

main().catch(console.error);
