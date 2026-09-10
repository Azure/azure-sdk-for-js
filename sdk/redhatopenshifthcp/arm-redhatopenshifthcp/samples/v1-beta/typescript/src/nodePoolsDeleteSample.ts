// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RedHatOpenShiftClient } from "@azure/arm-redhatopenshifthcp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a NodePool
 *
 * @summary delete a NodePool
 * x-ms-original-file: 2026-09-01-preview/NodePools_Delete_MaximumSet_Gen.json
 */
async function nodePoolsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "FDEA43EA-0230-4A7D-BDEE-F3AFF2183B1D";
  const client = new RedHatOpenShiftClient(credential, subscriptionId);
  await client.nodePools.delete("rgopenapi", "hcpCluster-name", "nodePool-name");
}

async function main(): Promise<void> {
  await nodePoolsDelete();
}

main().catch(console.error);
