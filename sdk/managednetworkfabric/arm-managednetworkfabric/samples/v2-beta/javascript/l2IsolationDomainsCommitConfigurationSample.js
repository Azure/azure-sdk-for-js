// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedNetworkFabricClient } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to commits the configuration of the given resources.
 *
 * @summary commits the configuration of the given resources.
 * x-ms-original-file: 2024-06-15-preview/L2IsolationDomains_CommitConfiguration.json
 */
async function l2IsolationDomainsCommitConfigurationMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.l2IsolationDomains.commitConfiguration(
    "example-rg",
    "example-l2domain",
  );
  console.log(result);
}

async function main() {
  await l2IsolationDomainsCommitConfigurationMaximumSetGen();
}

main().catch(console.error);
