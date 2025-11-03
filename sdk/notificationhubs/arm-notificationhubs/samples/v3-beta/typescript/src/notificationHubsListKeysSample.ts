// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NotificationHubsManagementClient } from "@azure/arm-notificationhubs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the Primary and Secondary ConnectionStrings to the NotificationHub
 *
 * @summary gets the Primary and Secondary ConnectionStrings to the NotificationHub
 * x-ms-original-file: 2023-10-01-preview/NotificationHubs/AuthorizationRuleListKeys.json
 */
async function notificationHubsListKeys(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "29cfa613-cbbc-4512-b1d6-1b3a92c7fa40";
  const client = new NotificationHubsManagementClient(credential, subscriptionId);
  const result = await client.notificationHubs.listKeys(
    "5ktrial",
    "nh-sdk-ns",
    "nh-sdk-hub",
    "sdk-AuthRules-5800",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await notificationHubsListKeys();
}

main().catch(console.error);
