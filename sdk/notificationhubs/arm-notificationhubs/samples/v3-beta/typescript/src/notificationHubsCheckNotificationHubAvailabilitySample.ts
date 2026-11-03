// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NotificationHubsManagementClient } from "@azure/arm-notificationhubs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to checks the availability of the given notificationHub in a namespace.
 *
 * @summary checks the availability of the given notificationHub in a namespace.
 * x-ms-original-file: 2023-10-01-preview/NotificationHubs/CheckAvailability.json
 */
async function notificationHubsCheckNotificationHubAvailability(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "29cfa613-cbbc-4512-b1d6-1b3a92c7fa40";
  const client = new NotificationHubsManagementClient(credential, subscriptionId);
  const result = await client.notificationHubs.checkNotificationHubAvailability(
    "5ktrial",
    "locp-newns",
    { name: "sdktest", location: "West Europe" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await notificationHubsCheckNotificationHubAvailability();
}

main().catch(console.error);
