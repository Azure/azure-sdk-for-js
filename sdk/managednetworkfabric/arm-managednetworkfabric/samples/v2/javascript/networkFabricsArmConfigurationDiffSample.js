// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureNetworkFabricManagementServiceAPI } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to post action: Triggers diff of NetworkFabric ARM Configuration.
 *
 * @summary post action: Triggers diff of NetworkFabric ARM Configuration.
 * x-ms-original-file: 2025-07-15/NetworkFabrics_ArmConfigurationDiff.json
 */
async function networkFabricsArmConfigurationDiffMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.networkFabrics.armConfigurationDiff("example-rg", "example-fabric");
  console.log(result);
}

async function main() {
  await networkFabricsArmConfigurationDiffMaximumSet();
}

main().catch(console.error);
