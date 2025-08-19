// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the list of the Notification Recipient Emails subscribed to a notification.
 *
 * @summary Gets the list of the Notification Recipient Emails subscribed to a notification.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementListWorkspaceNotificationRecipientEmails.json
 */

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiManagementListWorkspaceNotificationRecipientEmails(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const workspaceId = "wks1";
  const notificationName = "RequestPublisherNotificationMessage";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result =
    await client.workspaceNotificationRecipientEmail.listByNotification(
      resourceGroupName,
      serviceName,
      workspaceId,
      notificationName,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementListWorkspaceNotificationRecipientEmails();
}

main().catch(console.error);
