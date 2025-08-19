// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Adds a new customer communication to an Azure support ticket.
 *
 * @summary Adds a new customer communication to an Azure support ticket.
 * x-ms-original-file: specification/support/resource-manager/Microsoft.Support/stable/2024-04-01/examples/CreateNoSubscriptionSupportTicketCommunication.json
 */

import type { CommunicationDetails } from "@azure/arm-support";
import { MicrosoftSupport } from "@azure/arm-support";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function addCommunicationToNoSubscriptionTicket(): Promise<void> {
  const supportTicketName = "testticket";
  const communicationName = "testcommunication";
  const createCommunicationParameters: CommunicationDetails = {
    body: "This is a test message from a customer!",
    sender: "user@contoso.com",
    subject: "This is a test message from a customer!",
  };
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential);
  const result = await client.communicationsNoSubscription.beginCreateAndWait(
    supportTicketName,
    communicationName,
    createCommunicationParameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await addCommunicationToNoSubscriptionTicket();
}

main().catch(console.error);
