// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AdvisorManagementClient } = require("@azure/arm-advisor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get list of Azure Advisor resiliency reviews.
 *
 * @summary get list of Azure Advisor resiliency reviews.
 * x-ms-original-file: 2026-02-01-preview/ResiliencyReviewsList.json
 */
async function listResiliencyReviews() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AdvisorManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.resiliencyReviews.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listResiliencyReviews();
}

main().catch(console.error);
