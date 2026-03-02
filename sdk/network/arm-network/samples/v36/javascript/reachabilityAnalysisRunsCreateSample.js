// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Creates Reachability Analysis Runs.
 *
 * @summary Creates Reachability Analysis Runs.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/ReachabilityAnalysisRunPut.json
 */
async function reachabilityAnalysisRunCreate() {
  const subscriptionId =
    process.env["NETWORK_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkManagerName = "testNetworkManager";
  const workspaceName = "testWorkspace";
  const reachabilityAnalysisRunName = "testAnalysisRunName";
  const body = {
    properties: {
      description: "A sample reachability analysis run",
      intentId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/networkManagers/testNetworkManager/verifierWorkspaces/testVerifierWorkspace1/reachabilityAnalysisIntents/testReachabilityAnalysisIntenant1",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.reachabilityAnalysisRuns.create(
    resourceGroupName,
    networkManagerName,
    workspaceName,
    reachabilityAnalysisRunName,
    body,
  );
  console.log(result);
}

async function main() {
  await reachabilityAnalysisRunCreate();
}

main().catch(console.error);
