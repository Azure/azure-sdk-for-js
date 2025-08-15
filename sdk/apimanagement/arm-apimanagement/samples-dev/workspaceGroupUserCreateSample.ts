// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Add existing user to existing group
 *
 * @summary Add existing user to existing group
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementCreateWorkspaceGroupUser.json
 */
async function apiManagementCreateWorkspaceGroupUser(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const workspaceId = "wks1";
  const groupId = "tempgroup";
  const userId = "59307d350af58404d8a26300";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceGroupUser.create(
    resourceGroupName,
    serviceName,
    workspaceId,
    groupId,
    userId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreateWorkspaceGroupUser();
}

main().catch(console.error);
