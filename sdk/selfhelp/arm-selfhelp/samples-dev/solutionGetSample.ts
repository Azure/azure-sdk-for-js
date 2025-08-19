// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get the solution using the applicable solutionResourceName while creating the solution.
 *
 * @summary Get the solution using the applicable solutionResourceName while creating the solution.
 * x-ms-original-file: specification/help/resource-manager/Microsoft.Help/preview/2024-03-01-preview/examples/Solution_Get.json
 */

import { HelpRP } from "@azure/arm-selfhelp";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function solutionGet(): Promise<void> {
  const scope =
    "subscriptions/mySubscription/resourcegroups/myresourceGroup/providers/Microsoft.KeyVault/vaults/test-keyvault-rp";
  const solutionResourceName = "SolutionResource1";
  const credential = new DefaultAzureCredential();
  const client = new HelpRP(credential);
  const result = await client.solution.get(scope, solutionResourceName);
  console.log(result);
}

async function main(): Promise<void> {
  await solutionGet();
}

main().catch(console.error);
