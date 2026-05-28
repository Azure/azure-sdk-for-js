// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SubscriptionClient } from "@azure/arm-subscriptions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or Update Subscription tenant policy for user's tenant.
 *
 * @summary create or Update Subscription tenant policy for user's tenant.
 * x-ms-original-file: 2025-11-01-preview/changeTenantPolicy.json
 */
async function tenantPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SubscriptionClient(credential);
  const result = await client.subscriptionPolicy.addUpdatePolicyForTenant({
    blockSubscriptionsIntoTenant: true,
    blockSubscriptionsLeavingTenant: true,
    exemptedPrincipals: [
      "e879cf0f-2b4d-5431-109a-f72fc9868693",
      "9792da87-c97b-410d-a97d-27021ba09ce6",
    ],
  });
  console.log(result);
}

async function main(): Promise<void> {
  await tenantPolicy();
}

main().catch(console.error);
