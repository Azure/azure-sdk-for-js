// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DiscoveryClient } = require("@azure/arm-discovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a NodePool
 *
 * @summary update a NodePool
 * x-ms-original-file: 2026-02-01-preview/NodePools_Update_MaximumSet_Gen.json
 */
async function nodePoolsUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "C058B75F-64D2-4E9D-8B66-65339DCB22C7";
  const client = new DiscoveryClient(credential, subscriptionId);
  const result = await client.nodePools.update(
    "rgdiscovery",
    "f674a0697b0c54044e",
    "12ceb04d31658f1ec7",
    { properties: { maxNodeCount: 21, minNodeCount: 0 }, tags: { key5366: "uyhhzfhedjkqanudogu" } },
  );
  console.log(result);
}

async function main() {
  await nodePoolsUpdateMaximumSet();
}

main().catch(console.error);
