// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CancelSubscriptionRequest } from "@azure/arm-billing";
import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Cancels a usage-based subscription. This operation is supported only for billing accounts of type Microsoft Partner Agreement.
 *
 * @summary Cancels a usage-based subscription. This operation is supported only for billing accounts of type Microsoft Partner Agreement.
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/billingSubscriptionsCancel.json
 */
async function billingSubscriptionsCancel(): Promise<void> {
  const billingAccountName =
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31";
  const billingSubscriptionName = "11111111-1111-1111-1111-111111111111";
  const parameters: CancelSubscriptionRequest = {
    cancellationReason: "Compromise",
    customerId: "11111111-1111-1111-1111-111111111111",
  };
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.billingSubscriptions.beginCancelAndWait(
    billingAccountName,
    billingSubscriptionName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await billingSubscriptionsCancel();
}

main().catch(console.error);
