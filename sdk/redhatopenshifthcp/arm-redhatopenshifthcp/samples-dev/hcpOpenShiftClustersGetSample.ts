// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RedHatOpenShiftClient } from "@azure/arm-redhatopenshifthcp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a HcpOpenShiftCluster
 *
 * @summary get a HcpOpenShiftCluster
 * x-ms-original-file: 2026-09-01-preview/HcpOpenShiftClusters_Get_MaximumSet_Gen.json
 */
async function hcpOpenShiftClustersGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "FDEA43EA-0230-4A7D-BDEE-F3AFF2183B1D";
  const client = new RedHatOpenShiftClient(credential, subscriptionId);
  const result = await client.hcpOpenShiftClusters.get("rgopenapi", "my-cool-cluster");
  console.log(result);
}

async function main(): Promise<void> {
  await hcpOpenShiftClustersGet();
}

main().catch(console.error);
