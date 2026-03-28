// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or Update API Management publisher notification for the workspace.
 *
 * @summary create or Update API Management publisher notification for the workspace.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateWorkspaceNotification.json
 */
async function apiManagementCreateWorkspaceNotification() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceNotification.createOrUpdate(
    "rg1",
    "apimService1",
    "wks1",
    "RequestPublisherNotificationMessage",
  );
  console.log(result);
}

async function main() {
  await apiManagementCreateWorkspaceNotification();
}

main().catch(console.error);
