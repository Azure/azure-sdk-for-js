// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedNetworkFabricClient } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get Network Fabric resource details.
 *
 * @summary get Network Fabric resource details.
 * x-ms-original-file: 2024-06-15-preview/NetworkFabrics_Get.json
 */
async function networkFabricsGetMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.networkFabrics.get("example-rg", "example-fabric");
  console.log(result);
}

async function main() {
  await networkFabricsGetMaximumSetGen();
}

main().catch(console.error);
