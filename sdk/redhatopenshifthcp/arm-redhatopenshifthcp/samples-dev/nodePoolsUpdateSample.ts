// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RedHatOpenShiftClient } from "@azure/arm-redhatopenshifthcp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a NodePool
 *
 * @summary update a NodePool
 * x-ms-original-file: 2026-09-01-preview/NodePools_Update_MaximumSet_Gen.json
 */
async function nodePoolsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "FDEA43EA-0230-4A7D-BDEE-F3AFF2183B1D";
  const client = new RedHatOpenShiftClient(credential, subscriptionId);
  const result = await client.nodePools.update("rgopenapi", "hcpCluster-name", "nodePool-name", {});
  console.log(result);
}

async function main(): Promise<void> {
  await nodePoolsUpdate();
}

main().catch(console.error);
