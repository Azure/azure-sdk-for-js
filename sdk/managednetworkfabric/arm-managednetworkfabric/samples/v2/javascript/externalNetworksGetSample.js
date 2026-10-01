// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureNetworkFabricManagementServiceAPI } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to implements ExternalNetworks GET method.
 *
 * @summary implements ExternalNetworks GET method.
 * x-ms-original-file: 2025-07-15/ExternalNetworks_Get.json
 */
async function externalNetworksGetMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
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
