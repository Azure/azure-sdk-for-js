// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HelpRP } from "@azure/arm-selfhelp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the simplified Solutions using the applicable solutionResourceName while creating the simplified Solutions.
 *
 * @summary get the simplified Solutions using the applicable solutionResourceName while creating the simplified Solutions.
 * x-ms-original-file: 2024-03-01-preview/SimplifiedSolutions_Get.json
 */
async function solutionGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new HelpRP(credential);
  const result = await client.simplifiedSolutions.get(
    "subscriptions/mySubscription/resourcegroups/myresourceGroup/providers/Microsoft.KeyVault/vaults/test-keyvault-rp",
    "simplifiedSolutionsResourceName1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await solutionGet();
}

main().catch(console.error);
