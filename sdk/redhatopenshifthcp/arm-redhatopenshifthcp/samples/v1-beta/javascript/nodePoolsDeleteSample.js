// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RedHatOpenShiftClient } = require("@azure/arm-redhatopenshifthcp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a NodePool
 *
 * @summary delete a NodePool
 * x-ms-original-file: 2026-09-01-preview/NodePools_Delete_MaximumSet_Gen.json
 */
async function nodePoolsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "FDEA43EA-0230-4A7D-BDEE-F3AFF2183B1D";
  const client = new RedHatOpenShiftClient(credential, subscriptionId);
  await client.nodePools.delete("rgopenapi", "hcpCluster-name", "nodePool-name");
}

async function main() {
  await nodePoolsDelete();
}

main().catch(console.error);
