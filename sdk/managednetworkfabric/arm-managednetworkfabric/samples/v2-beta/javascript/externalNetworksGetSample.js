// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedNetworkFabricClient } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to implements ExternalNetworks GET method.
 *
 * @summary implements ExternalNetworks GET method.
 * x-ms-original-file: 2024-06-15-preview/ExternalNetworks_Get.json
 */
async function externalNetworksGetMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.externalNetworks.get(
    "example-rg",
    "example-externalnetwork",
    "example-ext",
  );
  console.log(result);
}

async function main() {
  await externalNetworksGetMaximumSetGen();
}

main().catch(console.error);
