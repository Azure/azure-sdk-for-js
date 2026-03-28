// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to removes the API Management user from the list of Notification.
 *
 * @summary removes the API Management user from the list of Notification.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteNotificationRecipientUser.json
 */
async function apiManagementDeleteNotificationRecipientUser() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.notificationRecipientUser.delete(
    "rg1",
    "apimService1",
    "RequestPublisherNotificationMessage",
    "576823d0a40f7e74ec07d642",
  );
}

async function main() {
  await apiManagementDeleteNotificationRecipientUser();
}

main().catch(console.error);
