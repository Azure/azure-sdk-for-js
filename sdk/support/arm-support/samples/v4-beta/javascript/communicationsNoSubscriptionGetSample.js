// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftSupport } = require("@azure/arm-support");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns communication details for a support ticket.
 *
 * @summary returns communication details for a support ticket.
 * x-ms-original-file: 2025-06-01-preview/GetCommunicationDetailsForSupportTicket.json
 */
async function getCommunicationDetailsForANoSubscriptionSupportTicket() {
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential);
  const result = await client.communicationsNoSubscription.get("testticket", "testmessage");
  console.log(result);
}

async function main() {
  await getCommunicationDetailsForANoSubscriptionSupportTicket();
}

main().catch(console.error);
