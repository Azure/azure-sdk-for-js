// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to merges the billing subscription provided in the request with a target billing subscription.
 *
 * @summary merges the billing subscription provided in the request with a target billing subscription.
 * x-ms-original-file: 2024-04-01/billingSubscriptionsMerge.json
 */
async function billingSubscriptionsMerge(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.billingSubscriptions.merge(
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
    "11111111-1111-1111-1111-111111111111",
    { quantity: 1, targetBillingSubscriptionName: "22222222-2222-2222-2222-222222222222" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await billingSubscriptionsMerge();
}

main().catch(console.error);
