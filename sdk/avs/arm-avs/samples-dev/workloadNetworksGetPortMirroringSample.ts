// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to get a WorkloadNetworkPortMirroring
 *
 * @summary get a WorkloadNetworkPortMirroring
 * x-ms-original-file: 2024-09-01/WorkloadNetworks_GetPortMirroring.json
 */

import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

async function workloadNetworksGetPortMirroring(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.workloadNetworks.getPortMirroring(
    "group1",
    "cloud1",
    "portMirroring1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await workloadNetworksGetPortMirroring();
}

main().catch(console.error);
