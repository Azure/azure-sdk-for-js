// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhci");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a validated solution recipe.
 *
 * @summary get a validated solution recipe.
 * x-ms-original-file: 2025-12-01-preview/ValidatedSolutionRecipes_Get.json
 */
async function validatedSolutionRecipesGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "b8d594e5-51f3-4c11-9c54-a7771b81c712";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.validatedSolutionRecipes.get("westus2", "10.2408.0");
  console.log(result);
}

async function main() {
  await validatedSolutionRecipesGet();
}

main().catch(console.error);
