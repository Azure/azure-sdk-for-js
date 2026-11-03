// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureNetworkFabricManagementServiceAPI } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a InternalNetworks.
 *
 * @summary gets a InternalNetworks.
 * x-ms-original-file: 2025-07-15/InternalNetworks_Get.json
 */
async function internalNetworksGetMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.internalNetworks.get(
    "example-rg",
    "example-l3isd",
    "example-internalnetwork",
  );
  console.log(result);
}

async function main() {
  await internalNetworksGetMaximumSetGen();
}

main().catch(console.error);
