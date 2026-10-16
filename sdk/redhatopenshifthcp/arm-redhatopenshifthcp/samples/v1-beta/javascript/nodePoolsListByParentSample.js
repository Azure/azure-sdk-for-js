// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RedHatOpenShiftClient } = require("@azure/arm-redhatopenshifthcp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list NodePool resources by HcpOpenShiftCluster
 *
 * @summary list NodePool resources by HcpOpenShiftCluster
 * x-ms-original-file: 2026-09-01-preview/NodePools_ListByParent_MaximumSet_Gen.json
 */
async function nodePoolsListByParent() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "FDEA43EA-0230-4A7D-BDEE-F3AFF2183B1D";
  const client = new RedHatOpenShiftClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.nodePools.listByParent("rgopenapi", "hcpCluster-name")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await nodePoolsListByParent();
}

main().catch(console.error);
