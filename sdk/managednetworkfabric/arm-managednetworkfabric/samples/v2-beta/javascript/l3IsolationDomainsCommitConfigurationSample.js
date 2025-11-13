// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedNetworkFabricClient } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to commits the configuration of the given resources.
 *
 * @summary commits the configuration of the given resources.
 * x-ms-original-file: 2024-06-15-preview/L3IsolationDomains_CommitConfiguration.json
 */
async function l3IsolationDomainsCommitConfigurationMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.l3IsolationDomains.commitConfiguration(
    "example-rg",
    "example-l3domain",
  );
  console.log(result);
}

async function main() {
  await l3IsolationDomainsCommitConfigurationMaximumSetGen();
}

main().catch(console.error);
