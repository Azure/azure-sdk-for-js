// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedNetworkFabricClient } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to implements Network Fabric SKU GET method.
 *
 * @summary implements Network Fabric SKU GET method.
 * x-ms-original-file: 2024-06-15-preview/NetworkFabricSkus_Get.json
 */
async function networkFabricSkusGetMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.networkFabricSkus.get("wxample-fabricsku");
  console.log(result);
}

async function main() {
  await networkFabricSkusGetMaximumSetGen();
}

main().catch(console.error);
