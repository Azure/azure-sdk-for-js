// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftSupport } from "@azure/arm-support";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns chatTranscript details for a no subscription support ticket.
 *
 * @summary returns chatTranscript details for a no subscription support ticket.
 * x-ms-original-file: 2025-06-01-preview/GetchatTranscriptDetailsForSupportTicket.json
 */
async function getChatTranscriptDetailsForASubscriptionSupportTicket(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential);
  const result = await client.chatTranscriptsNoSubscription.get(
    "testticket",
    "b371192a-b094-4a71-b093-7246029b0a54",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getChatTranscriptDetailsForASubscriptionSupportTicket();
}

main().catch(console.error);
