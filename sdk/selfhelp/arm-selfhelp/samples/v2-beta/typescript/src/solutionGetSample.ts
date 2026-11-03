// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HelpRP } from "@azure/arm-selfhelp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the solution using the applicable solutionResourceName while creating the solution.
 *
 * @summary get the solution using the applicable solutionResourceName while creating the solution.
 * x-ms-original-file: 2024-03-01-preview/Solution_Get.json
 */
async function solutionGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new HelpRP(credential);
  const result = await client.solution.get(
    "subscriptions/mySubscription/resourcegroups/myresourceGroup/providers/Microsoft.KeyVault/vaults/test-keyvault-rp",
    "SolutionResource1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await solutionGet();
}

main().catch(console.error);
