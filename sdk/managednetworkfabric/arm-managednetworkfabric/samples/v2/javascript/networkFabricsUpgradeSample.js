// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureNetworkFabricManagementServiceAPI } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to upgrades the version of the underlying resources in the given Network Fabric instance.
 *
 * @summary upgrades the version of the underlying resources in the given Network Fabric instance.
 * x-ms-original-file: 2025-07-15/NetworkFabrics_Upgrade.json
 */
async function networkFabricsUpgradeMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.networkFabrics.upgrade("example-rg", "example-fabric", {
    version: "3.x.x",
    action: "Start",
  });
  console.log(result);
}

async function main() {
  await networkFabricsUpgradeMaximumSetGen();
}

main().catch(console.error);
