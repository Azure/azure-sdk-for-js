// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets Reachability Analysis Run.
 *
 * @summary gets Reachability Analysis Run.
 * x-ms-original-file: 2025-05-01/ReachabilityAnalysisRunGet.json
 */
async function reachabilityAnalysisRunGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.reachabilityAnalysisRuns.get(
    "rg1",
    "testNetworkManager",
    "testWorkspace",
    "testAnalysisRunName",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await reachabilityAnalysisRunGet();
}

main().catch(console.error);
