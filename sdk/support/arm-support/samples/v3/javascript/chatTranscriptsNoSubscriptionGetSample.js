// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Returns chatTranscript details for a no subscription support ticket.
 *
 * @summary Returns chatTranscript details for a no subscription support ticket.
 * x-ms-original-file: specification/support/resource-manager/Microsoft.Support/stable/2024-04-01/examples/GetchatTranscriptDetailsForSupportTicket.json
 */

const { MicrosoftSupport } = require("@azure/arm-support");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

async function getChatTranscriptDetailsForASubscriptionSupportTicket() {
  const supportTicketName = "testticket";
  const chatTranscriptName = "b371192a-b094-4a71-b093-7246029b0a54";
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential);
  const result = await client.chatTranscriptsNoSubscription.get(
    supportTicketName,
    chatTranscriptName,
  );
  console.log(result);
}

async function main() {
  await getChatTranscriptDetailsForASubscriptionSupportTicket();
}

main().catch(console.error);
