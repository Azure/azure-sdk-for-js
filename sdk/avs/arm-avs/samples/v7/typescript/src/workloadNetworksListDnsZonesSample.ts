// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list WorkloadNetworkDnsZone resources by WorkloadNetwork
 *
 * @summary list WorkloadNetworkDnsZone resources by WorkloadNetwork
 * x-ms-original-file: 2025-09-01/WorkloadNetworks_ListDnsZones.json
 */
async function workloadNetworksListDnsZones(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workloadNetworks.listDnsZones("group1", "cloud1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await workloadNetworksListDnsZones();
}

main().catch(console.error);
