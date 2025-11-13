// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedNetworkFabricClient } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to implements Gateway GET method.
 *
 * @summary implements Gateway GET method.
 * x-ms-original-file: 2024-06-15-preview/InternetGateways_Get.json
 */
async function internetGatewaysGetMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.internetGateways.get("example-rg", "example-internetGateway");
  console.log(result);
}

async function main() {
  await internetGatewaysGetMaximumSetGen();
}

main().catch(console.error);
