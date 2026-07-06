// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftSupport } from "@azure/arm-support";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to adds a new customer communication to an Azure support ticket.
 *
 * @summary adds a new customer communication to an Azure support ticket.
 * x-ms-original-file: 2026-07-01/CreateSupportTicketCommunication.json
 */
async function addCommunicationToSubscriptionTicket(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "132d901f-189d-4381-9214-fe68e27e05a1";
  const client = new MicrosoftSupport(credential, subscriptionId);
  const result = await client.communications.create("testticket", "testcommunication", {
    body: "This is a test message from a customer!",
    sender: "user@contoso.com",
    subject: "This is a test message from a customer!",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await addCommunicationToSubscriptionTicket();
}

main().catch(console.error);
