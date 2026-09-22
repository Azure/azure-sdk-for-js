// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftSupport } from "@azure/arm-support";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all chat transcripts for a support ticket
 *
 * @summary lists all chat transcripts for a support ticket
 * x-ms-original-file: 2025-06-01-preview/ListChatTranscriptsForSupportTicket.json
 */
async function listChatTranscriptsForANoSubscriptionSupportTicket(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential);
  const resArray = new Array();
  for await (const item of client.chatTranscriptsNoSubscription.list("testticket")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listChatTranscriptsForANoSubscriptionSupportTicket();
}

main().catch(console.error);
