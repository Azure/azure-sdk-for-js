// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create a WorkloadNetworkPortMirroring
 *
 * @summary create a WorkloadNetworkPortMirroring
 * x-ms-original-file: 2024-09-01/WorkloadNetworks_CreatePortMirroring.json
 */

import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

async function workloadNetworksCreatePortMirroring(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.workloadNetworks.createPortMirroring(
    "group1",
    "cloud1",
    "portMirroring1",
    {
      properties: {
        displayName: "portMirroring1",
        direction: "BIDIRECTIONAL",
        source: "vmGroup1",
        destination: "vmGroup2",
        revision: 1,
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await workloadNetworksCreatePortMirroring();
}

main().catch(console.error);
