// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to determine if Notification Recipient Email subscribed to the notification.
 *
 * @summary determine if Notification Recipient Email subscribed to the notification.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementHeadWorkspaceNotificationRecipientEmail.json
 */
async function apiManagementHeadWorkspaceNotificationRecipientEmail() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.workspaceNotificationRecipientEmail.checkEntityExists(
    "rg1",
    "apimService1",
    "wks1",
    "RequestPublisherNotificationMessage",
    "contoso@live.com",
  );
}

async function main() {
  await apiManagementHeadWorkspaceNotificationRecipientEmail();
}

main().catch(console.error);
