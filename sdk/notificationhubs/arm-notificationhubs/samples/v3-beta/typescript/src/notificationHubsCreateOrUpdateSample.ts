// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NotificationHubsManagementClient } from "@azure/arm-notificationhubs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates/Update a NotificationHub in a namespace.
 *
 * @summary creates/Update a NotificationHub in a namespace.
 * x-ms-original-file: 2023-10-01-preview/NotificationHubs/CreateOrUpdate.json
 */
async function notificationHubsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "29cfa613-cbbc-4512-b1d6-1b3a92c7fa40";
  const client = new NotificationHubsManagementClient(credential, subscriptionId);
  const result = await client.notificationHubs.createOrUpdate(
    "5ktrial",
    "nh-sdk-ns",
    "nh-sdk-hub",
    { location: "eastus", properties: {} },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await notificationHubsCreateOrUpdate();
}

main().catch(console.error);
