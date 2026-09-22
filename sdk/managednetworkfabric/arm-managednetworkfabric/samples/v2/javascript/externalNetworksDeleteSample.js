// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureNetworkFabricManagementServiceAPI } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to implements ExternalNetworks DELETE method.
 *
 * @summary implements ExternalNetworks DELETE method.
 * x-ms-original-file: 2025-07-15/ExternalNetworks_Delete.json
 */
async function externalNetworksDeleteMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  await client.externalNetworks.delete("example-rg", "example-externalnetwork", "example-ext");
}

async function main() {
  await externalNetworksDeleteMaximumSetGen();
}

main().catch(console.error);
