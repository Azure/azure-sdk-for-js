// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the list of the Notification Recipient Emails subscribed to a notification.
 *
 * @summary gets the list of the Notification Recipient Emails subscribed to a notification.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListWorkspaceNotificationRecipientEmails.json
 */
async function apiManagementListWorkspaceNotificationRecipientEmails(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceNotificationRecipientEmail.listByNotification(
    "rg1",
    "apimService1",
    "wks1",
    "RequestPublisherNotificationMessage",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementListWorkspaceNotificationRecipientEmails();
}

main().catch(console.error);
