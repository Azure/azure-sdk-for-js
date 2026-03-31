// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes Reachability Analysis Run.
 *
 * @summary deletes Reachability Analysis Run.
 * x-ms-original-file: 2025-05-01/ReachabilityAnalysisRunDelete.json
 */
async function reachabilityAnalysisRunDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.reachabilityAnalysisRuns.delete(
    "rg1",
    "testNetworkManager",
    "testWorkspace",
    "testAnalysisRun",
  );
}

async function main() {
  await reachabilityAnalysisRunDelete();
}

main().catch(console.error);
