// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureNetworkFabricManagementServiceAPI } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to refreshes the configuration of the underlying resources in the given Network Fabric instance.
 *
 * @summary refreshes the configuration of the underlying resources in the given Network Fabric instance.
 * x-ms-original-file: 2025-07-15/NetworkFabrics_RefreshConfiguration.json
 */
async function networkFabricsRefreshConfigurationMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.networkFabrics.refreshConfiguration("example-rg", "example-fabric");
  console.log(result);
}

async function main() {
  await networkFabricsRefreshConfigurationMaximumSetGen();
}

main().catch(console.error);
