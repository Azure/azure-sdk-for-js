// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Check the availability of a resource name. This API should be used to check the uniqueness of the name for support ticket creation for the selected subscription.
 *
 * @summary Check the availability of a resource name. This API should be used to check the uniqueness of the name for support ticket creation for the selected subscription.
 * x-ms-original-file: specification/support/resource-manager/Microsoft.Support/stable/2024-04-01/examples/CheckNameAvailability.json
 */

const { MicrosoftSupport } = require("@azure/arm-support");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

async function checksWhetherNameIsAvailableForSupportTicketResource() {
  const subscriptionId =
    process.env["SUPPORT_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const checkNameAvailabilityInput = {
    name: "sampleName",
    type: "Microsoft.Support/supportTickets",
  };
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential, subscriptionId);
  const result = await client.supportTicketsNoSubscription.checkNameAvailability(
    checkNameAvailabilityInput,
  );
  console.log(result);
}

async function main() {
  await checksWhetherNameIsAvailableForSupportTicketResource();
}

main().catch(console.error);
