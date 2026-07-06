// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftSupport } = require("@azure/arm-support");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns chatTranscript details for a support ticket under a subscription.
 *
 * @summary returns chatTranscript details for a support ticket under a subscription.
 * x-ms-original-file: 2026-07-01/GetchatTranscriptDetailsForSubscriptionSupportTicket.json
 */
async function getChatTranscriptDetailsForASubscriptionSupportTicket() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "132d901f-189d-4381-9214-fe68e27e05a1";
  const client = new MicrosoftSupport(credential, subscriptionId);
  const result = await client.chatTranscripts.get(
    "testticket",
    "69586795-45e9-45b5-bd9e-c9bb237d3e44",
  );
  console.log(result);
}

async function main() {
  await getChatTranscriptDetailsForASubscriptionSupportTicket();
}

main().catch(console.error);
