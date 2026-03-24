// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to adds the Email address to the list of Recipients for the Notification.
 *
 * @summary adds the Email address to the list of Recipients for the Notification.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateNotificationRecipientEmail.json
 */
async function apiManagementCreateNotificationRecipientEmail() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.notificationRecipientEmail.createOrUpdate(
    "rg1",
    "apimService1",
    "RequestPublisherNotificationMessage",
    "foobar@live.com",
  );
  console.log(result);
}

async function main() {
  await apiManagementCreateNotificationRecipientEmail();
}

main().catch(console.error);
