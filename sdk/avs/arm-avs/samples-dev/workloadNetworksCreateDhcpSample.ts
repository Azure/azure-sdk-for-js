// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create a WorkloadNetworkDhcp
 *
 * @summary create a WorkloadNetworkDhcp
 * x-ms-original-file: 2024-09-01/WorkloadNetworks_CreateDhcp.json
 */

import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

async function workloadNetworksCreateDhcp(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.workloadNetworks.createDhcp("group1", "cloud1", "dhcp1", {
    properties: {
      dhcpType: "SERVER",
      displayName: "dhcpConfigurations1",
      serverAddress: "40.1.5.1/24",
      leaseTime: 86400,
      revision: 1,
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await workloadNetworksCreateDhcp();
}

main().catch(console.error);
