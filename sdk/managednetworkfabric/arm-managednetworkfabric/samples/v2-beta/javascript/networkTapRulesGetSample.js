// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedNetworkFabricClient } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get Network Tap Rule resource details.
 *
 * @summary get Network Tap Rule resource details.
 * x-ms-original-file: 2024-06-15-preview/NetworkTapRules_Get.json
 */
async function networkTapRulesGetMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.networkTapRules.get("example-rg", "example-tapRule");
  console.log(result);
}

async function main() {
  await networkTapRulesGetMaximumSetGen();
}

main().catch(console.error);
