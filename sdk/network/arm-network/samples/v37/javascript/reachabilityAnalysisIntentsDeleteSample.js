// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes Reachability Analysis Intent.
 *
 * @summary deletes Reachability Analysis Intent.
 * x-ms-original-file: 2025-05-01/ReachabilityAnalysisIntentDelete.json
 */
async function reachabilityAnalysisIntentDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.reachabilityAnalysisIntents.delete(
    "rg1",
    "testNetworkManager",
    "testWorkspace",
    "testAnalysisIntent",
  );
}

async function main() {
  await reachabilityAnalysisIntentDelete();
}

main().catch(console.error);
