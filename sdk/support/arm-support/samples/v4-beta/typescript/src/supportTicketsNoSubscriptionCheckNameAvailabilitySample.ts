// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftSupport } from "@azure/arm-support";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to check the availability of a resource name. This API should be used to check the uniqueness of the name for support ticket creation for the selected subscription.
 *
 * @summary check the availability of a resource name. This API should be used to check the uniqueness of the name for support ticket creation for the selected subscription.
 * x-ms-original-file: 2025-06-01-preview/CheckNameAvailability.json
 */
async function checksWhetherNameIsAvailableForSupportTicketResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftSupport(credential, subscriptionId);
  const result = await client.supportTicketsNoSubscription.checkNameAvailability({
    name: "sampleName",
    type: "Microsoft.Support/supportTickets",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await checksWhetherNameIsAvailableForSupportTicketResource();
}

main().catch(console.error);
