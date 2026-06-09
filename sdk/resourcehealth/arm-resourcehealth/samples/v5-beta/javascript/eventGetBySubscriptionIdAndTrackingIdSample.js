// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftResourceHealth } = require("@azure/arm-resourcehealth");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to service health event in the subscription by event tracking id
 *
 * @summary service health event in the subscription by event tracking id
 * x-ms-original-file: 2025-05-01/Event_GetBySubscriptionIdAndTrackingId.json
 */
async function securityAdvisoriesEventBySubscriptionIdAndTrackingId() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new MicrosoftResourceHealth(credential, subscriptionId);
  const result = await client.event.getBySubscriptionIdAndTrackingId("eventTrackingId", {
    filter: "properties/status eq 'Active'",
    queryStartTime: "5/12/2025",
  });
  console.log(result);
}

async function main() {
  await securityAdvisoriesEventBySubscriptionIdAndTrackingId();
}

main().catch(console.error);
