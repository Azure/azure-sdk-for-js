// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets list of Reachability Analysis Runs.
 *
 * @summary gets list of Reachability Analysis Runs.
 * x-ms-original-file: 2025-05-01/ReachabilityAnalysisRunList.json
 */
async function reachabilityAnalysisRunList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.reachabilityAnalysisRuns.list(
    "rg1",
    "testNetworkManager",
    "testVerifierWorkspace1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await reachabilityAnalysisRunList();
}

main().catch(console.error);
