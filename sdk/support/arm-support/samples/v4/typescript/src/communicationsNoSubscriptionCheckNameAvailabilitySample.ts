// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftSupport } from "@azure/arm-support";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to check the availability of a resource name. This API should be used to check the uniqueness of the name for adding a new communication to the support ticket.
 *
 * @summary check the availability of a resource name. This API should be used to check the uniqueness of the name for adding a new communication to the support ticket.
 * x-ms-original-file: 2026-07-01/CheckNameAvailabilityForNoSubscriptionSupportTicketCommunication.json
 */
async function checksWhetherNameIsAvailableForCommunicationResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential);
  const result = await client.communicationsNoSubscription.checkNameAvailability("testticket", {
    name: "sampleName",
    type: "Microsoft.Support/communications",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await checksWhetherNameIsAvailableForCommunicationResource();
}

main().catch(console.error);
