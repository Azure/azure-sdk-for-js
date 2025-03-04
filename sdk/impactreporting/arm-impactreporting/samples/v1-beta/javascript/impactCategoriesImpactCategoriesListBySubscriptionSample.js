// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ImpactClient } = require("@azure/arm-impactreporting");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list ImpactCategory resources by subscription
 *
 * @summary list ImpactCategory resources by subscription
 * x-ms-original-file: 2024-05-01-preview/ImpactCategories_ListBySubscription.json
 */
async function getImpactCategoriesListBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ImpactClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.impactCategories.listBySubscription(
    "microsoft.compute/virtualmachines",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getImpactCategoriesListBySubscription();
}

main().catch(console.error);
