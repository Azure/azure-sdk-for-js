// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Checks that user entity specified by identifier is associated with the group entity.
 *
 * @summary Checks that user entity specified by identifier is associated with the group entity.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementHeadGroupUser.json
 */
async function apiManagementHeadGroupUser(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const groupId = "59306a29e4bbd510dc24e5f9";
  const userId = "5931a75ae4bbd512a88c680b";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.groupUser.checkEntityExists(
    resourceGroupName,
    serviceName,
    groupId,
    userId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementHeadGroupUser();
}

main().catch(console.error);
