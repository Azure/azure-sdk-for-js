// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftSupport } from "@azure/arm-support";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to check the availability of a resource name. This API should be used to check the uniqueness of the name for adding a new communication to the support ticket.
 *
 * @summary check the availability of a resource name. This API should be used to check the uniqueness of the name for adding a new communication to the support ticket.
 * x-ms-original-file: 2025-06-01-preview/CheckNameAvailabilityForSupportTicketCommunication.json
 */
async function checksWhetherNameIsAvailableForCommunicationResourceForASubscriptionSupportTicket(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "132d901f-189d-4381-9214-fe68e27e05a1";
  const client = new MicrosoftSupport(credential, subscriptionId);
  const result = await client.communications.checkNameAvailability("testticket", {
    name: "sampleName",
    type: "Microsoft.Support/communications",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await checksWhetherNameIsAvailableForCommunicationResourceForASubscriptionSupportTicket();
}

main().catch(console.error);
