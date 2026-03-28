// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to removes the API Management user from the list of Notification.
 *
 * @summary removes the API Management user from the list of Notification.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteWorkspaceNotificationRecipientUser.json
 */
async function apiManagementDeleteWorkspaceNotificationRecipientUser(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.workspaceNotificationRecipientUser.delete(
    "rg1",
    "apimService1",
    "wks1",
    "RequestPublisherNotificationMessage",
    "576823d0a40f7e74ec07d642",
  );
}

async function main(): Promise<void> {
  await apiManagementDeleteWorkspaceNotificationRecipientUser();
}

main().catch(console.error);
