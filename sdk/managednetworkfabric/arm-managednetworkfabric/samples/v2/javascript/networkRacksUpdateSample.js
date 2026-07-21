// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureNetworkFabricManagementServiceAPI } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update certain properties of the Network Rack resource.
 *
 * @summary update certain properties of the Network Rack resource.
 * x-ms-original-file: 2025-07-15/NetworkRacks_Update.json
 */
async function networkRacksUpdateMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.networkRacks.update("example-rg", "example-rack", {
    tags: { keyId: "keyValue" },
  });
  console.log(result);
}

async function main() {
  await networkRacksUpdateMaximumSetGen();
}

main().catch(console.error);
