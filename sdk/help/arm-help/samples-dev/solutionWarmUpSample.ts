// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HelpClient } from "@azure/arm-help";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to warm up the solution resource by preloading asynchronous diagnostics results into cache
 *
 * @summary warm up the solution resource by preloading asynchronous diagnostics results into cache
 * x-ms-original-file: 2024-03-01-preview/Solution_WarmUp.json
 */
async function solutionWarmUp(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new HelpClient(credential, subscriptionId);
  await client.solution.warmUp(
    "subscriptions/mySubscription/resourcegroups/myresourceGroup/providers/Microsoft.KeyVault/vaults/test-keyvault-rp",
    "SolutionResourceName1",
  );
}

async function main(): Promise<void> {
  await solutionWarmUp();
}

main().catch(console.error);
