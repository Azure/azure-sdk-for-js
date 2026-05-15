// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates Reachability Analysis Intent.
 *
 * @summary creates Reachability Analysis Intent.
 * x-ms-original-file: 2025-05-01/ReachabilityAnalysisIntentPut.json
 */
async function reachabilityAnalysisIntentCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.reachabilityAnalysisIntents.create(
    "rg1",
    "testNetworkManager",
    "testWorkspace",
    "testAnalysisIntentName",
    {
      properties: {
        description: "A sample reachability analysis intent",
        destinationResourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Compute/virtualMachines/testVmDest",
        ipTraffic: {
          destinationIps: ["10.4.0.1"],
          destinationPorts: ["0"],
          protocols: ["Any"],
          sourceIps: ["10.4.0.0"],
          sourcePorts: ["0"],
        },
        sourceResourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Compute/virtualMachines/testVmSrc",
      },
    },
  );
  console.log(result);
}

async function main() {
  await reachabilityAnalysisIntentCreate();
}

main().catch(console.error);
