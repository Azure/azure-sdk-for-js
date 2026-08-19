// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RedHatOpenShiftClient } from "@azure/arm-redhatopenshifthcp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list NodePool resources by HcpOpenShiftCluster
 *
 * @summary list NodePool resources by HcpOpenShiftCluster
 * x-ms-original-file: 2026-06-30-preview/NodePools_ListByParent_MaximumSet_Gen.json
 */
async function nodePoolsListByParent(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "FDEA43EA-0230-4A7D-BDEE-F3AFF2183B1D";
  const client = new RedHatOpenShiftClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.nodePools.listByParent("rgopenapi", "hcpCluster-name")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await nodePoolsListByParent();
}

main().catch(console.error);
