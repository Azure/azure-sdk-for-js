// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DiscoveryClient } = require("@azure/arm-discovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a NodePool
 *
 * @summary delete a NodePool
 * x-ms-original-file: 2026-06-01/NodePools_Delete_MaximumSet_Gen.json
 */
async function nodePoolsDeleteMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "A54D43BD-2F5F-4BB1-95D4-9A8D23CC7DD4";
  const client = new DiscoveryClient(credential, subscriptionId);
  await client.nodePools.delete("rgdiscovery", "5024d5e8fe2b743588", "d79a36a71cc10c19ce");
}

async function main() {
  await nodePoolsDeleteMaximumSet();
}

main().catch(console.error);
