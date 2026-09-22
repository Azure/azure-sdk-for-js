// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftResourceHealth } = require("@azure/arm-resourcehealth");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to service health event details specific in the subscription by event tracking id. This can be used to fetch sensitive properties for Billing event type.
 *
 * @summary service health event details specific in the subscription by event tracking id. This can be used to fetch sensitive properties for Billing event type.
 * x-ms-original-file: 2025-05-01/Event_fetchBillingCommunicationDetailsBySubscriptionIdAndTrackingId.json
 */
async function billingEventDetailsBySubscriptionIdAndTrackingId() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new MicrosoftResourceHealth(credential, subscriptionId);
  const result =
    await client.event.fetchBilllingCommunicationDetailsBySubscriptionIdAndTrackingId(
      "eventTrackingId",
    );
  console.log(result);
}

async function main() {
  await billingEventDetailsBySubscriptionIdAndTrackingId();
}

main().catch(console.error);
