// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedNetworkFabricClient } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets an Internet Gateway Rule resource.
 *
 * @summary gets an Internet Gateway Rule resource.
 * x-ms-original-file: 2024-06-15-preview/InternetGatewayRules_Get.json
 */
async function internetGatewayRulesGetMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.internetGatewayRules.get("example-rg", "example-internetGatewayRule");
  console.log(result);
}

async function main() {
  await internetGatewayRulesGetMaximumSetGen();
}

main().catch(console.error);
