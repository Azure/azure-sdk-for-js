// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ImpactClient } from "@azure/arm-impactreporting";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list ImpactCategory resources by subscription
 *
 * @summary list ImpactCategory resources by subscription
 * x-ms-original-file: 2024-05-01-preview/ImpactCategories_ListBySubscription.json
 */
async function getImpactCategoriesListBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ImpactClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.impactCategories.ImpactCategories_listBySubscription({
    resourceType: "microsoft.compute/virtualmachines",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  getImpactCategoriesListBySubscription();
}

main().catch(console.error);
