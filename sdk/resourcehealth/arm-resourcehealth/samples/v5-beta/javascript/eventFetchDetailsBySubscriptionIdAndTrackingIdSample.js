// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftResourceHealth } = require("@azure/arm-resourcehealth");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to service health event details in the subscription by event tracking id. This can be used to fetch sensitive properties for Security Advisory events. Please see https://learn.microsoft.com/en-us/azure/service-health/security-advisories-elevated-access
 *
 * @summary service health event details in the subscription by event tracking id. This can be used to fetch sensitive properties for Security Advisory events. Please see https://learn.microsoft.com/en-us/azure/service-health/security-advisories-elevated-access
 * x-ms-original-file: 2025-05-01/Event_fetchDetailsBySubscriptionIdAndTrackingId.json
 */
async function eventDetailsBySubscriptionIdAndTrackingId() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new MicrosoftResourceHealth(credential, subscriptionId);
  const result = await client.event.fetchDetailsBySubscriptionIdAndTrackingId("eventTrackingId");
  console.log(result);
}

async function main() {
  await eventDetailsBySubscriptionIdAndTrackingId();
}

main().catch(console.error);
