// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a WorkloadNetworkDnsZone
 *
 * @summary update a WorkloadNetworkDnsZone
 * x-ms-original-file: 2024-09-01/WorkloadNetworks_UpdateDnsZone.json
 */
async function workloadNetworksUpdateDnsZone(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.workloadNetworks.updateDnsZone("group1", "cloud1", "dnsZone1", {
    properties: {
      displayName: "dnsZone1",
      domain: [],
      dnsServerIps: ["1.1.1.1"],
      sourceIp: "8.8.8.8",
      revision: 1,
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await workloadNetworksUpdateDnsZone();
}

main().catch(console.error);
