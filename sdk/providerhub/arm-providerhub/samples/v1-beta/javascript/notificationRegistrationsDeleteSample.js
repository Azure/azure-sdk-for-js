// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ProviderHubClient } = require("@azure/arm-providerhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a notification registration.
 *
 * @summary deletes a notification registration.
 * x-ms-original-file: 2024-09-01/NotificationRegistrations_Delete.json
 */
async function notificationRegistrationsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  await client.notificationRegistrations.delete("Microsoft.Contoso", "fooNotificationRegistration");
}

async function main() {
  await notificationRegistrationsDelete();
}

main().catch(console.error);
