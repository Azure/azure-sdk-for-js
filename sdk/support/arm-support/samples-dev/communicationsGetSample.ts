// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Returns communication details for a support ticket.
 *
 * @summary Returns communication details for a support ticket.
 * x-ms-original-file: specification/support/resource-manager/Microsoft.Support/stable/2024-04-01/examples/GetCommunicationDetailsForSubscriptionSupportTicket.json
 */

import { MicrosoftSupport } from "@azure/arm-support";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getCommunicationDetailsForASubscriptionSupportTicket(): Promise<void> {
  const subscriptionId =
    process.env["SUPPORT_SUBSCRIPTION_ID"] || "132d901f-189d-4381-9214-fe68e27e05a1";
  const supportTicketName = "testticket";
  const communicationName = "testmessage";
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential, subscriptionId);
  const result = await client.communications.get(supportTicketName, communicationName);
  console.log(result);
}

async function main(): Promise<void> {
  await getCommunicationDetailsForASubscriptionSupportTicket();
}

main().catch(console.error);
