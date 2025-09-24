// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a WorkloadNetworkSegment
 *
 * @summary update a WorkloadNetworkSegment
 * x-ms-original-file: 2024-09-01/WorkloadNetworks_UpdateSegments.json
 */
async function workloadNetworksUpdateSegments() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.workloadNetworks.updateSegments("group1", "cloud1", "segment1", {
    properties: {
      connectedGateway: "/infra/tier-1s/gateway",
      subnet: {
        dhcpRanges: ["40.20.0.0-40.20.0.1"],
        gatewayAddress: "40.20.20.20/16",
      },
      revision: 1,
    },
  });
  console.log(result);
}

async function main() {
  await workloadNetworksUpdateSegments();
}

main().catch(console.error);
