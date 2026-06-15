// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureNetworkFabricManagementServiceAPI } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get Network Rack resource details.
 *
 * @summary get Network Rack resource details.
 * x-ms-original-file: 2025-07-15/NetworkRacks_Get.json
 */
async function networkRacksGetMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.networkRacks.get("example-rg", "example-rack");
  console.log(result);
}

async function main() {
  await networkRacksGetMaximumSetGen();
}

main().catch(console.error);
