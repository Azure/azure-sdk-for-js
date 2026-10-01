// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HelpRP } = require("@azure/arm-selfhelp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the solution using the applicable solutionResourceName while creating the solution.
 *
 * @summary get the solution using the applicable solutionResourceName while creating the solution.
 * x-ms-original-file: 2024-03-01-preview/Solution_Get.json
 */
async function solutionGet() {
  const credential = new DefaultAzureCredential();
  const client = new HelpRP(credential);
  const result = await client.solution.get(
    "subscriptions/mySubscription/resourcegroups/myresourceGroup/providers/Microsoft.KeyVault/vaults/test-keyvault-rp",
    "SolutionResource1",
  );
  console.log(result);
}

async function main() {
  await solutionGet();
}

main().catch(console.error);
