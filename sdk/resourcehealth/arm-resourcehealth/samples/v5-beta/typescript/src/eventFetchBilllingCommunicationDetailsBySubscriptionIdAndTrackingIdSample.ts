// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftResourceHealth } from "@azure/arm-resourcehealth";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to service health event details specific in the subscription by event tracking id. This can be used to fetch sensitive properties for Billing event type.
 *
 * @summary service health event details specific in the subscription by event tracking id. This can be used to fetch sensitive properties for Billing event type.
 * x-ms-original-file: 2025-05-01/Event_fetchBillingCommunicationDetailsBySubscriptionIdAndTrackingId.json
 */
async function billingEventDetailsBySubscriptionIdAndTrackingId(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new MicrosoftResourceHealth(credential, subscriptionId);
  const result =
    await client.event.fetchBilllingCommunicationDetailsBySubscriptionIdAndTrackingId(
      "eventTrackingId",
    );
  console.log(result);
}

async function main(): Promise<void> {
  await billingEventDetailsBySubscriptionIdAndTrackingId();
}

main().catch(console.error);
