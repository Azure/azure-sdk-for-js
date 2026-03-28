// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to determine if the Notification Recipient User is subscribed to the notification.
 *
 * @summary determine if the Notification Recipient User is subscribed to the notification.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementHeadWorkspaceNotificationRecipientUser.json
 */
async function apiManagementHeadWorkspaceNotificationRecipientUser() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.workspaceNotificationRecipientUser.checkEntityExists(
    "rg1",
    "apimService1",
    "wks1",
    "RequestPublisherNotificationMessage",
    "576823d0a40f7e74ec07d642",
  );
}

async function main() {
  await apiManagementHeadWorkspaceNotificationRecipientUser();
}

main().catch(console.error);
