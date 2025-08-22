// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes Reachability Analysis Run.
 *
 * @summary Deletes Reachability Analysis Run.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-07-01/examples/ReachabilityAnalysisRunDelete.json
 */

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function reachabilityAnalysisRunDelete(): Promise<void> {
  const subscriptionId =
    process.env["NETWORK_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
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

async function main(): Promise<void> {
  await reachabilityAnalysisRunDelete();
}

main().catch(console.error);
