// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ProviderHubClient } = require("@azure/arm-providerhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the list of the notification registrations for the given provider.
 *
 * @summary gets the list of the notification registrations for the given provider.
 * x-ms-original-file: 2024-09-01/NotificationRegistrations_ListByProviderRegistration.json
 */
async function notificationRegistrationsListByProviderRegistration() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.notificationRegistrations.listByProviderRegistration(
    "Microsoft.Contoso",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await notificationRegistrationsListByProviderRegistration();
}

main().catch(console.error);
