// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Removes the email from the list of Notification.
 *
 * @summary Removes the email from the list of Notification.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementDeleteWorkspaceNotificationRecipientEmail.json
 */
async function apiManagementDeleteWorkspaceNotificationRecipientEmail(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const workspaceId = "wks1";
  const notificationName = "RequestPublisherNotificationMessage";
  const email = "contoso@live.com";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceNotificationRecipientEmail.delete(
    resourceGroupName,
    serviceName,
    workspaceId,
    notificationName,
    email,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementDeleteWorkspaceNotificationRecipientEmail();
}

main().catch(console.error);
