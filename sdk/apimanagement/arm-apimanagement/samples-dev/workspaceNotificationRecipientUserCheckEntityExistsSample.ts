// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Determine if the Notification Recipient User is subscribed to the notification.
 *
 * @summary Determine if the Notification Recipient User is subscribed to the notification.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementHeadWorkspaceNotificationRecipientUser.json
 */
async function apiManagementHeadWorkspaceNotificationRecipientUser(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const workspaceId = "wks1";
  const notificationName = "RequestPublisherNotificationMessage";
  const userId = "576823d0a40f7e74ec07d642";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result =
    await client.workspaceNotificationRecipientUser.checkEntityExists(
      resourceGroupName,
      serviceName,
      workspaceId,
      notificationName,
      userId,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementHeadWorkspaceNotificationRecipientUser();
}

main().catch(console.error);
