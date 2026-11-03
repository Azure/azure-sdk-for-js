// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureNetworkFabricManagementServiceAPI } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to commits the configuration of the given resources.
 *
 * @summary commits the configuration of the given resources.
 * x-ms-original-file: 2025-07-15/RoutePolicies_CommitConfiguration.json
 */
async function routePoliciesCommitConfigurationMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.routePolicies.commitConfiguration(
    "example-rg",
    "example-routePolicy",
  );
  console.log(result);
}

async function main() {
  await routePoliciesCommitConfigurationMaximumSetGen();
}

main().catch(console.error);
