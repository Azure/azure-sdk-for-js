// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AdvisorManagementClient } from "@azure/arm-advisor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to obtains cached recommendations for a subscription. The recommendations are generated or computed by invoking generateRecommendations.
 *
 * @summary obtains cached recommendations for a subscription. The recommendations are generated or computed by invoking generateRecommendations.
 * x-ms-original-file: 2026-02-01-preview/ListRecommendationsSubscriptionResourceUri.json
 */
async function listRecommendationsSubscriptionResourceUri(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "a5481ee1-95df-47d0-85d4-dd3f0dfa19bc";
  const client = new AdvisorManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.recommendations.list({ top: 10 })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listRecommendationsSubscriptionResourceUri();
}

main().catch(console.error);
