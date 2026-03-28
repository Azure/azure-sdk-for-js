// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to removes the email from the list of Notification.
 *
 * @summary removes the email from the list of Notification.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteNotificationRecipientEmail.json
 */
async function apiManagementDeleteNotificationRecipientEmail(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.notificationRecipientEmail.delete(
    "rg1",
    "apimService1",
    "RequestPublisherNotificationMessage",
    "contoso@live.com",
  );
}

async function main(): Promise<void> {
  await apiManagementDeleteNotificationRecipientEmail();
}

main().catch(console.error);
