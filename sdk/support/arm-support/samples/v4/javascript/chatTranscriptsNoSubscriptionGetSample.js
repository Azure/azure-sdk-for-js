// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftSupport } = require("@azure/arm-support");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns chatTranscript details for a no subscription support ticket.
 *
 * @summary returns chatTranscript details for a no subscription support ticket.
 * x-ms-original-file: 2026-07-01/GetchatTranscriptDetailsForSupportTicket.json
 */
async function getChatTranscriptDetailsForASubscriptionSupportTicket() {
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential);
  const result = await client.chatTranscriptsNoSubscription.get(
    "testticket",
    "b371192a-b094-4a71-b093-7246029b0a54",
  );
  console.log(result);
}

async function main() {
  await getChatTranscriptDetailsForASubscriptionSupportTicket();
}

main().catch(console.error);
