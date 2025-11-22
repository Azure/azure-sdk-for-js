// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Returns communication details for a support ticket.
 *
 * @summary Returns communication details for a support ticket.
 * x-ms-original-file: specification/support/resource-manager/Microsoft.Support/stable/2024-04-01/examples/GetCommunicationDetailsForSupportTicket.json
 */

import { MicrosoftSupport } from "@azure/arm-support";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getCommunicationDetailsForANoSubscriptionSupportTicket(): Promise<void> {
  const supportTicketName = "testticket";
  const communicationName = "testmessage";
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential);
  const result = await client.communicationsNoSubscription.get(
    supportTicketName,
    communicationName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getCommunicationDetailsForANoSubscriptionSupportTicket();
}

main().catch(console.error);
