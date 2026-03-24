// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to determine if the Notification Recipient User is subscribed to the notification.
 *
 * @summary determine if the Notification Recipient User is subscribed to the notification.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementHeadNotificationRecipientUser.json
 */
async function apiManagementHeadNotificationRecipientUser(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.notificationRecipientUser.checkEntityExists(
    "rg1",
    "apimService1",
    "RequestPublisherNotificationMessage",
    "576823d0a40f7e74ec07d642",
  );
}

async function main(): Promise<void> {
  await apiManagementHeadNotificationRecipientUser();
}

main().catch(console.error);
