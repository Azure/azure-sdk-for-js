// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to get a WorkloadNetworkDhcp
 *
 * @summary get a WorkloadNetworkDhcp
 * x-ms-original-file: 2024-09-01/WorkloadNetworks_GetDhcp.json
 */

import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

async function workloadNetworksGetDhcp(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.workloadNetworks.getDhcp("group1", "dhcp1", "cloud1");
  console.log(result);
}

async function main(): Promise<void> {
  await workloadNetworksGetDhcp();
}

main().catch(console.error);
