// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list WorkloadNetworkPortMirroring resources by WorkloadNetwork
 *
 * @summary list WorkloadNetworkPortMirroring resources by WorkloadNetwork
 * x-ms-original-file: 2024-09-01/WorkloadNetworks_ListPortMirroring.json
 */
async function workloadNetworksListPortMirroring(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workloadNetworks.listPortMirroring("group1", "cloud1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await workloadNetworksListPortMirroring();
}

main().catch(console.error);
