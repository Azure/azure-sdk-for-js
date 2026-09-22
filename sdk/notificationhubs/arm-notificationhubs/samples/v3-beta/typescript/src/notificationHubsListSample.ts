// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NotificationHubsManagementClient } from "@azure/arm-notificationhubs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the notification hubs associated with a namespace.
 *
 * @summary lists the notification hubs associated with a namespace.
 * x-ms-original-file: 2023-10-01-preview/NotificationHubs/List.json
 */
async function notificationHubsList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "29cfa613-cbbc-4512-b1d6-1b3a92c7fa40";
  const client = new NotificationHubsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.notificationHubs.list("5ktrial", "nh-sdk-ns")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await notificationHubsList();
}

main().catch(console.error);
