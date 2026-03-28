// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to removes the email from the list of Notification.
 *
 * @summary removes the email from the list of Notification.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteWorkspaceNotificationRecipientEmail.json
 */
async function apiManagementDeleteWorkspaceNotificationRecipientEmail() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.workspaceNotificationRecipientEmail.delete(
    "rg1",
    "apimService1",
    "wks1",
    "RequestPublisherNotificationMessage",
    "contoso@live.com",
  );
}

async function main() {
  await apiManagementDeleteWorkspaceNotificationRecipientEmail();
}

main().catch(console.error);
