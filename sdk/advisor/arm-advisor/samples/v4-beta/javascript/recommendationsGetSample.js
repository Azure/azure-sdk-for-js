// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AdvisorManagementClient } = require("@azure/arm-advisor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to obtains details of a cached recommendation.
 *
 * @summary obtains details of a cached recommendation.
 * x-ms-original-file: 2026-02-01-preview/GetRecommendationDetailServiceGroupResourceUri.json
 */
async function getRecommendationDetailServiceGroupResourceUri() {
  const credential = new DefaultAzureCredential();
  const client = new AdvisorManagementClient(credential);
  const result = await client.recommendations.get(
    "providers/microsoft.management/serviceGroup/serviceGroupXYZ",
    "37c93209-4bfb-4f3b-8874-ccc718f7a467",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to obtains details of a cached recommendation.
 *
 * @summary obtains details of a cached recommendation.
 * x-ms-original-file: 2026-02-01-preview/GetRecommendationDetailSubscriptionResourceUri.json
 */
async function getRecommendationDetailSubscriptionResourceUri() {
  const credential = new DefaultAzureCredential();
  const client = new AdvisorManagementClient(credential);
  const result = await client.recommendations.get(
    "subscriptions/a5481ee1-95df-47d0-85d4-dd3f0dfa19bc/resourceGroups/resourceGroup/providers/Microsoft.Compute/availabilitysets/armavset",
    "2e7c72b2d7987ec224a1ebae03398b0fbdaa9a5a6a762e6fcf1c806599744b45",
  );
  console.log(result);
}

async function main() {
  await getRecommendationDetailServiceGroupResourceUri();
  await getRecommendationDetailSubscriptionResourceUri();
}

main().catch(console.error);
