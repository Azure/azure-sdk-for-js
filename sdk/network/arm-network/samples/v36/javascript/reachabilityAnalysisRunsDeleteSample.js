// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Deletes Reachability Analysis Run.
 *
 * @summary Deletes Reachability Analysis Run.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/ReachabilityAnalysisRunDelete.json
 */
async function reachabilityAnalysisRunDelete() {
  const subscriptionId =
    process.env["NETWORK_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkManagerName = "testNetworkManager";
  const workspaceName = "testWorkspace";
  const reachabilityAnalysisRunName = "testAnalysisRun";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.reachabilityAnalysisRuns.beginDeleteAndWait(
    resourceGroupName,
    networkManagerName,
    workspaceName,
    reachabilityAnalysisRunName,
  );
  console.log(result);
}

async function main() {
  await reachabilityAnalysisRunDelete();
}

main().catch(console.error);
