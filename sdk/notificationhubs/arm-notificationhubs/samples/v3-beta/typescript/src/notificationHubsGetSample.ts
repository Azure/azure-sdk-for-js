// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NotificationHubsManagementClient } from "@azure/arm-notificationhubs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the notification hub.
 *
 * @summary gets the notification hub.
 * x-ms-original-file: 2023-10-01-preview/NotificationHubs/Get.json
 */
async function notificationHubsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "29cfa613-cbbc-4512-b1d6-1b3a92c7fa40";
  const client = new NotificationHubsManagementClient(credential, subscriptionId);
  const result = await client.notificationHubs.get("5ktrial", "nh-sdk-ns", "nh-sdk-hub");
  console.log(result);
}

async function main(): Promise<void> {
  await notificationHubsGet();
}

main().catch(console.error);
