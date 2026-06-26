// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftSupport } from "@azure/arm-support";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets details for a specific support ticket. Support ticket data is available for 18 months after ticket creation. If a ticket was created more than 18 months ago, a request for data might cause an error.
 *
 * @summary gets details for a specific support ticket. Support ticket data is available for 18 months after ticket creation. If a ticket was created more than 18 months ago, a request for data might cause an error.
 * x-ms-original-file: 2026-06-01/GetSupportTicketDetails.json
 */
async function getDetailsOfATicket(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential);
  const result = await client.supportTicketsNoSubscription.get("testticket");
  console.log(result);
}

async function main(): Promise<void> {
  await getDetailsOfATicket();
}

main().catch(console.error);
