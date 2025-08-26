// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes Reachability Analysis Intent.
 *
 * @summary Deletes Reachability Analysis Intent.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-07-01/examples/ReachabilityAnalysisIntentDelete.json
 */

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function reachabilityAnalysisIntentDelete(): Promise<void> {
  const subscriptionId =
    process.env["NETWORK_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkManagerName = "testNetworkManager";
  const workspaceName = "testWorkspace";
  const reachabilityAnalysisIntentName = "testAnalysisIntent";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.reachabilityAnalysisIntents.delete(
    resourceGroupName,
    networkManagerName,
    workspaceName,
    reachabilityAnalysisIntentName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await reachabilityAnalysisIntentDelete();
}

main().catch(console.error);
