// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a WorkloadNetworkPublicIP
 *
 * @summary create a WorkloadNetworkPublicIP
 * x-ms-original-file: 2025-09-01/WorkloadNetworks_CreatePublicIP.json
 */
async function workloadNetworksCreatePublicIP(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.workloadNetworks.createPublicIP("group1", "cloud1", "publicIP1", {
    properties: { displayName: "publicIP1", numberOfPublicIPs: 32 },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await workloadNetworksCreatePublicIP();
}

main().catch(console.error);
