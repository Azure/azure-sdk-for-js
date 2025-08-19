// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HelpRP } from "@azure/arm-selfhelp";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Warm up the solution resource by preloading asynchronous diagnostics results into cache
 *
 * @summary Warm up the solution resource by preloading asynchronous diagnostics results into cache
 * x-ms-original-file: specification/help/resource-manager/Microsoft.Help/preview/2024-03-01-preview/examples/Solution_WarmUp.json
 */
async function solutionWarmUp(): Promise<void> {
  const scope =
    "subscriptions/mySubscription/resourcegroups/myresourceGroup/providers/Microsoft.KeyVault/vaults/test-keyvault-rp";
  const solutionResourceName = "SolutionResourceName1";
  const credential = new DefaultAzureCredential();
  const client = new HelpRP(credential);
  const result = await client.solution.warmUp(scope, solutionResourceName);
  console.log(result);
}

async function main(): Promise<void> {
  await solutionWarmUp();
}

main().catch(console.error);
