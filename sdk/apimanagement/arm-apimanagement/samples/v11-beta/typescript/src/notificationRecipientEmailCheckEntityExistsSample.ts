// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to determine if Notification Recipient Email subscribed to the notification.
 *
 * @summary determine if Notification Recipient Email subscribed to the notification.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementHeadNotificationRecipientEmail.json
 */
async function apiManagementHeadNotificationRecipientEmail(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.notificationRecipientEmail.checkEntityExists(
    "rg1",
    "apimService1",
    "RequestPublisherNotificationMessage",
    "contoso@live.com",
  );
}

async function main(): Promise<void> {
  await apiManagementHeadNotificationRecipientEmail();
}

main().catch(console.error);
