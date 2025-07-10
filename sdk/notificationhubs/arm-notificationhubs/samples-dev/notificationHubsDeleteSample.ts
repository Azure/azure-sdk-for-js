// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NotificationHubsManagementClient } from "@azure/arm-notificationhubs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a notification hub associated with a namespace.
 *
 * @summary deletes a notification hub associated with a namespace.
 * x-ms-original-file: 2023-10-01-preview/NotificationHubs/Delete.json
 */
async function notificationHubsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "29cfa613-cbbc-4512-b1d6-1b3a92c7fa40";
  const client = new NotificationHubsManagementClient(credential, subscriptionId);
  await client.notificationHubs.delete("5ktrial", "nh-sdk-ns", "nh-sdk-hub");
}

async function main(): Promise<void> {
  await notificationHubsDelete();
}

main().catch(console.error);
