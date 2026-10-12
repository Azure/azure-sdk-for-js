// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AdvisorManagementClient } from "@azure/arm-advisor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to obtains recommendations for a subscription.
 *
 * @summary obtains recommendations for a subscription.
 * x-ms-original-file: 2026-08-01-preview/ListRecommendationsSubscriptionResourceUri.json
 */
async function listRecommendationsSubscriptionResourceUri(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "a5481ee1-95df-47d0-85d4-dd3f0dfa19bc";
  const client = new AdvisorManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.recommendations.list({ mode: "all", top: 10 })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listRecommendationsSubscriptionResourceUri();
}

main().catch(console.error);
