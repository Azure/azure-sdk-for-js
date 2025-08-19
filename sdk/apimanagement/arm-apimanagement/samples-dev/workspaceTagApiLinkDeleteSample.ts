// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes the specified API from the specified tag.
 *
 * @summary Deletes the specified API from the specified tag.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementDeleteWorkspaceTagApiLink.json
 */

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiManagementDeleteWorkspaceTagApiLink(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const workspaceId = "wks1";
  const tagId = "tag1";
  const apiLinkId = "link1";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceTagApiLink.delete(
    resourceGroupName,
    serviceName,
    workspaceId,
    tagId,
    apiLinkId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementDeleteWorkspaceTagApiLink();
}

main().catch(console.error);
