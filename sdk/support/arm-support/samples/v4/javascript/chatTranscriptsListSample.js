// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftSupport } = require("@azure/arm-support");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all chat transcripts for a support ticket under subscription
 *
 * @summary lists all chat transcripts for a support ticket under subscription
 * x-ms-original-file: 2026-07-01/ListChatTranscriptsForSubscriptionSupportTicket.json
 */
async function listChatTranscriptsForASubscriptionSupportTicket() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "132d901f-189d-4381-9214-fe68e27e05a1";
  const client = new MicrosoftSupport(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.chatTranscripts.list("testticket")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listChatTranscriptsForASubscriptionSupportTicket();
}

main().catch(console.error);
