// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the Reachability Analysis Intent.
 *
 * @summary get the Reachability Analysis Intent.
 * x-ms-original-file: 2025-05-01/ReachabilityAnalysisIntentGet.json
 */
async function reachabilityAnalysisIntentGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.reachabilityAnalysisIntents.get(
    "rg1",
    "testNetworkManager",
    "testWorkspace",
    "testAnalysisIntentName",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await reachabilityAnalysisIntentGet();
}

main().catch(console.error);
