// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RedHatOpenShiftClient } = require("@azure/arm-redhatopenshifthcp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a NodePool
 *
 * @summary get a NodePool
 * x-ms-original-file: 2026-06-30-preview/NodePools_Get_MaximumSet_Gen.json
 */
async function nodePoolsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "FDEA43EA-0230-4A7D-BDEE-F3AFF2183B1D";
  const client = new RedHatOpenShiftClient(credential, subscriptionId);
  const result = await client.nodePools.get("rgopenapi", "hcpCluster-name", "nodepool-name");
  console.log(result);
}

async function main() {
  await nodePoolsGet();
}

main().catch(console.error);
