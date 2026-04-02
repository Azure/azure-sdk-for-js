// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates Reachability Analysis Runs.
 *
 * @summary creates Reachability Analysis Runs.
 * x-ms-original-file: 2025-05-01/ReachabilityAnalysisRunPut.json
 */
async function reachabilityAnalysisRunCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.reachabilityAnalysisRuns.create(
    "rg1",
    "testNetworkManager",
    "testWorkspace",
    "testAnalysisRunName",
    {
      properties: {
        description: "A sample reachability analysis run",
        intentId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/networkManagers/testNetworkManager/verifierWorkspaces/testVerifierWorkspace1/reachabilityAnalysisIntents/testReachabilityAnalysisIntenant1",
      },
    },
  );
  console.log(result);
}

async function main() {
  await reachabilityAnalysisRunCreate();
}

main().catch(console.error);
