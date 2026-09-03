// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NotificationHubsManagementClient } = require("@azure/arm-notificationhubs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to test send a push notification.
 *
 * @summary test send a push notification.
 * x-ms-original-file: 2023-10-01-preview/NotificationHubs/DebugSend.json
 */
async function notificationHubsDebugSend() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "29cfa613-cbbc-4512-b1d6-1b3a92c7fa40";
  const client = new NotificationHubsManagementClient(credential, subscriptionId);
  const result = await client.notificationHubs.debugSend("5ktrial", "nh-sdk-ns", "nh-sdk-hub");
  console.log(result);
}

async function main() {
  await notificationHubsDebugSend();
}

main().catch(console.error);
