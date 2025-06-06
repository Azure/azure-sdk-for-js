// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a WorkloadNetworkPortMirroring
 *
 * @summary update a WorkloadNetworkPortMirroring
 * x-ms-original-file: 2024-09-01/WorkloadNetworks_UpdatePortMirroring.json
 */
async function workloadNetworksUpdatePortMirroring() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.workloadNetworks.updatePortMirroring(
    "group1",
    "cloud1",
    "portMirroring1",
    {
      properties: {
        direction: "BIDIRECTIONAL",
        source: "vmGroup1",
        destination: "vmGroup2",
        revision: 1,
      },
    },
  );
  console.log(result);
}

async function main() {
  await workloadNetworksUpdatePortMirroring();
}

main().catch(console.error);
