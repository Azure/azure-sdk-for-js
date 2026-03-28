// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to adds the API Management User to the list of Recipients for the Notification.
 *
 * @summary adds the API Management User to the list of Recipients for the Notification.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateWorkspaceNotificationRecipientUser.json
 */
async function apiManagementCreateWorkspaceNotificationRecipientUser(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceNotificationRecipientUser.createOrUpdate(
    "rg1",
    "apimService1",
    "wks1",
    "RequestPublisherNotificationMessage",
    "576823d0a40f7e74ec07d642",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreateWorkspaceNotificationRecipientUser();
}

main().catch(console.error);
