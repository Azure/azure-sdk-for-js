// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SubscriptionClient } from "@azure/arm-subscriptions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the subscription tenant policy for the user's tenant.
 *
 * @summary get the subscription tenant policy for the user's tenant.
 * x-ms-original-file: 2025-11-01-preview/getTenantPolicy.json
 */
async function getTenantPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SubscriptionClient(credential);
  const result = await client.subscriptionPolicy.getPolicyForTenant();
  console.log(result);
}

async function main(): Promise<void> {
  await getTenantPolicy();
}

main().catch(console.error);
