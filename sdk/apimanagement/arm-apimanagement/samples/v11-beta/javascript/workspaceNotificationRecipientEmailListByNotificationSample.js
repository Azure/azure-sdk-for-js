// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the list of the Notification Recipient Emails subscribed to a notification.
 *
 * @summary gets the list of the Notification Recipient Emails subscribed to a notification.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListWorkspaceNotificationRecipientEmails.json
 */
async function apiManagementListWorkspaceNotificationRecipientEmails() {
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

async function main() {
  await apiManagementListWorkspaceNotificationRecipientEmails();
}

main().catch(console.error);
