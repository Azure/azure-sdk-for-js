// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AdvisorManagementClient } = require("@azure/arm-advisor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get existing Azure Advisor resiliency review by id.
 *
 * @summary get existing Azure Advisor resiliency review by id.
 * x-ms-original-file: 2026-02-01-preview/ResiliencyReviewsGet.json
 */
async function getResiliencyReview() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AdvisorManagementClient(credential, subscriptionId);
  const result = await client.resiliencyReviews.get("11111111-1111-2222-3333-444444444444");
  console.log(result);
}

async function main() {
  await getResiliencyReview();
}

main().catch(console.error);
