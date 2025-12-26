// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhci");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all validated solution recipes.
 *
 * @summary list all validated solution recipes.
 * x-ms-original-file: 2025-12-01-preview/ValidatedSolutionRecipes_ListBySubscriptionLocationResource.json
 */
async function validatedSolutionRecipesListBySubscriptionLocationResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "b8d594e5-51f3-4c11-9c54-a7771b81c712";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.validatedSolutionRecipes.listBySubscriptionLocationResource(
    "westus2",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await validatedSolutionRecipesListBySubscriptionLocationResource();
}

main().catch(console.error);
