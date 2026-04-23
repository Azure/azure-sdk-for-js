// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets list of Reachability Analysis Runs.
 *
 * @summary Gets list of Reachability Analysis Runs.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/ReachabilityAnalysisRunList.json
 */
async function reachabilityAnalysisRunList() {
  const subscriptionId =
    process.env["NETWORK_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkManagerName = "testNetworkManager";
  const workspaceName = "testVerifierWorkspace1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.reachabilityAnalysisRuns.list(
    resourceGroupName,
    networkManagerName,
    workspaceName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await reachabilityAnalysisRunList();
}

main().catch(console.error);
