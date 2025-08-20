// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Update the requiredInputs or additional information needed to execute the solution
 *
 * @summary Update the requiredInputs or additional information needed to execute the solution
 * x-ms-original-file: specification/help/resource-manager/Microsoft.Help/preview/2024-03-01-preview/examples/Solution_Update.json
 */

import { HelpRP } from "@azure/arm-selfhelp";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function solutionUpdate(): Promise<void> {
  const scope =
    "subscriptions/mySubscription/resourcegroups/myresourceGroup/providers/Microsoft.KeyVault/vaults/test-keyvault-rp";
  const solutionResourceName = "SolutionResourceName1";
  const credential = new DefaultAzureCredential();
  const client = new HelpRP(credential);
  const result = await client.solution.beginUpdateAndWait(scope, solutionResourceName);
  console.log(result);
}

async function main(): Promise<void> {
  await solutionUpdate();
}

main().catch(console.error);
