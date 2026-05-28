// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProviderHubClient } from "@azure/arm-providerhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the notification registration details.
 *
 * @summary gets the notification registration details.
 * x-ms-original-file: 2024-09-01/NotificationRegistrations_Get.json
 */
async function notificationRegistrationsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  const result = await client.notificationRegistrations.get(
    "Microsoft.Contoso",
    "fooNotificationRegistration",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await notificationRegistrationsGet();
}

main().catch(console.error);
