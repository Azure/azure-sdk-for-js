// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftSupport } from "@azure/arm-support";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns communication details for a support ticket.
 *
 * @summary returns communication details for a support ticket.
 * x-ms-original-file: 2026-06-01/GetCommunicationDetailsForSubscriptionSupportTicket.json
 */
async function getCommunicationDetailsForASubscriptionSupportTicket(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "132d901f-189d-4381-9214-fe68e27e05a1";
  const client = new MicrosoftSupport(credential, subscriptionId);
  const result = await client.communications.get("testticket", "testmessage");
  console.log(result);
}

async function main(): Promise<void> {
  await getCommunicationDetailsForASubscriptionSupportTicket();
}

main().catch(console.error);
