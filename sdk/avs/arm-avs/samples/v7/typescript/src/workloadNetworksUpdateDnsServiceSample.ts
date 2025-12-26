// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a WorkloadNetworkDnsService
 *
 * @summary update a WorkloadNetworkDnsService
 * x-ms-original-file: 2025-09-01/WorkloadNetworks_UpdateDnsService.json
 */
async function workloadNetworksUpdateDnsService(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.workloadNetworks.updateDnsService("group1", "cloud1", "dnsService1", {
    properties: {
      displayName: "dnsService1",
      dnsServiceIp: "5.5.5.5",
      defaultDnsZone: "defaultDnsZone1",
      fqdnZones: ["fqdnZone1"],
      logLevel: "INFO",
      revision: 1,
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await workloadNetworksUpdateDnsService();
}

main().catch(console.error);
