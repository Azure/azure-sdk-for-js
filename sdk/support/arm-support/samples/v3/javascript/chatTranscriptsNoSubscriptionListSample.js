// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists all chat transcripts for a support ticket
 *
 * @summary Lists all chat transcripts for a support ticket
 * x-ms-original-file: specification/support/resource-manager/Microsoft.Support/stable/2024-04-01/examples/ListChatTranscriptsForSupportTicket.json
 */

const { MicrosoftSupport } = require("@azure/arm-support");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

async function listChatTranscriptsForANoSubscriptionSupportTicket() {
  const supportTicketName = "testticket";
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential);
  const resArray = new Array();
  for await (const item of client.chatTranscriptsNoSubscription.list(supportTicketName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listChatTranscriptsForANoSubscriptionSupportTicket();
}

main().catch(console.error);
