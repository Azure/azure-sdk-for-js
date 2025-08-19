// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SubscriptionClient } from "@azure/arm-subscriptions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Get Billing Account Policy.
 *
 * @summary Get Billing Account Policy.
 * x-ms-original-file: specification/subscription/resource-manager/Microsoft.Subscription/stable/2021-10-01/examples/getBillingAccountPolicy.json
 */
async function getBillingAccountPolicy(): Promise<void> {
  const billingAccountId = "testBillingAccountId";
  const credential = new DefaultAzureCredential();
  const client = new SubscriptionClient(credential);
  const result = await client.billingAccount.getPolicy(billingAccountId);
  console.log(result);
}

getBillingAccountPolicy().catch(console.error);
