// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ProviderHubClient } = require("@azure/arm-providerhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the notification registration details.
 *
 * @summary gets the notification registration details.
 * x-ms-original-file: 2024-09-01/NotificationRegistrations_Get.json
 */
async function notificationRegistrationsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  const result = await client.notificationRegistrations.get(
    "Microsoft.Contoso",
    "fooNotificationRegistration",
  );
  console.log(result);
}

async function main() {
  await notificationRegistrationsGet();
}

main().catch(console.error);
