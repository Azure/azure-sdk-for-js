// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AdvisorManagementClient } from "@azure/arm-advisor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get list of Azure Advisor resiliency reviews.
 *
 * @summary get list of Azure Advisor resiliency reviews.
 * x-ms-original-file: 2026-02-01-preview/ResiliencyReviewsList.json
 */
async function listResiliencyReviews(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AdvisorManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.resiliencyReviews.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listResiliencyReviews();
}

main().catch(console.error);
