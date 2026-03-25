// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DiscoveryClient } = require("@azure/arm-discovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a NodePool
 *
 * @summary get a NodePool
 * x-ms-original-file: 2026-02-01-preview/NodePools_Get_MaximumSet_Gen.json
 */
async function nodePoolsGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "C058B75F-64D2-4E9D-8B66-65339DCB22C7";
  const client = new DiscoveryClient(credential, subscriptionId);
  const result = await client.nodePools.get(
    "rgdiscovery",
    "3d4fce3989a31db9c7",
    "80084da43e5c8bc50e",
  );
  console.log(result);
}

async function main() {
  await nodePoolsGetMaximumSet();
}

main().catch(console.error);
