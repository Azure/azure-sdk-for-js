// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftSupport } = require("@azure/arm-support");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to check the availability of a resource name. This API should be used to check the uniqueness of the name for support ticket creation for the selected subscription.
 *
 * @summary check the availability of a resource name. This API should be used to check the uniqueness of the name for support ticket creation for the selected subscription.
 * x-ms-original-file: 2025-06-01-preview/CheckNameAvailabilityWithSubscription.json
 */
async function checksWhetherNameIsAvailableForASubscriptionSupportTicketResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "132d901f-189d-4381-9214-fe68e27e05a1";
  const client = new MicrosoftSupport(credential, subscriptionId);
  const result = await client.supportTickets.checkNameAvailability({
    name: "sampleName",
    type: "Microsoft.Support/supportTickets",
  });
  console.log(result);
}

async function main() {
  await checksWhetherNameIsAvailableForASubscriptionSupportTicketResource();
}

main().catch(console.error);
