// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftSupport } from "@azure/arm-support";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to adds a new customer communication to an Azure support ticket.
 *
 * @summary adds a new customer communication to an Azure support ticket.
 * x-ms-original-file: 2026-06-01/CreateNoSubscriptionSupportTicketCommunication.json
 */
async function addCommunicationToNoSubscriptionTicket(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential);
  const result = await client.communicationsNoSubscription.create(
    "testticket",
    "testcommunication",
    {
      body: "This is a test message from a customer!",
      sender: "user@contoso.com",
      subject: "This is a test message from a customer!",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await addCommunicationToNoSubscriptionTicket();
}

main().catch(console.error);
