// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DiscoveryClient } = require("@azure/arm-discovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list NodePool resources by Supercomputer
 *
 * @summary list NodePool resources by Supercomputer
 * x-ms-original-file: 2026-02-01-preview/NodePools_ListBySupercomputer_MaximumSet_Gen.json
 */
async function nodePoolsListBySupercomputerMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "C058B75F-64D2-4E9D-8B66-65339DCB22C7";
  const client = new DiscoveryClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.nodePools.listBySupercomputer(
    "rgdiscovery",
    "7cc28f3db7c8fa0087",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await nodePoolsListBySupercomputerMaximumSet();
}

main().catch(console.error);
