// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HelpRP } from "@azure/arm-selfhelp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update the requiredInputs or additional information needed to execute the solution
 *
 * @summary update the requiredInputs or additional information needed to execute the solution
 * x-ms-original-file: 2024-03-01-preview/Solution_Update.json
 */
async function solutionUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new HelpRP(credential);
  const result = await client.solution.update(
    "subscriptions/mySubscription/resourcegroups/myresourceGroup/providers/Microsoft.KeyVault/vaults/test-keyvault-rp",
    "SolutionResourceName1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await solutionUpdate();
}

main().catch(console.error);
