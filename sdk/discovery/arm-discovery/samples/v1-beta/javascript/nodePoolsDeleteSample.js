// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DiscoveryClient } = require("@azure/arm-discovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a NodePool
 *
 * @summary delete a NodePool
 * x-ms-original-file: 2026-02-01-preview/NodePools_Delete_MaximumSet_Gen.json
 */
async function nodePoolsDeleteMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "C058B75F-64D2-4E9D-8B66-65339DCB22C7";
  const client = new DiscoveryClient(credential, subscriptionId);
  await client.nodePools.delete("rgdiscovery", "6ddaf20b09c36fc7ef", "6dcea29fcbc2279a3b");
}

async function main() {
  await nodePoolsDeleteMaximumSet();
}

main().catch(console.error);
