// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to removes the email from the list of Notification.
 *
 * @summary removes the email from the list of Notification.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteNotificationRecipientEmail.json
 */
async function apiManagementDeleteNotificationRecipientEmail() {
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

async function main() {
  await apiManagementDeleteNotificationRecipientEmail();
}

main().catch(console.error);
