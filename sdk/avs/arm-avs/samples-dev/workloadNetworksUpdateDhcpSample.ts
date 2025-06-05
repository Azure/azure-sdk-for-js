// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a WorkloadNetworkDhcp
 *
 * @summary update a WorkloadNetworkDhcp
 * x-ms-original-file: 2024-09-01/WorkloadNetworks_UpdateDhcp.json
 */
async function workloadNetworksUpdateDhcp(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.workloadNetworks.updateDhcp(
    "group1",
    "cloud1",
    "dhcp1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await workloadNetworksUpdateDhcp();
}

main().catch(console.error);
