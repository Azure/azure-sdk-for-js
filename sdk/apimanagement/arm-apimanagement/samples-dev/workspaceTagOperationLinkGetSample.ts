// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the operation link for the tag.
 *
 * @summary Gets the operation link for the tag.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementGetWorkspaceTagOperationLink.json
 */

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiManagementGetWorkspaceTagOperationLink(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const workspaceId = "wks1";
  const tagId = "tag1";
  const operationLinkId = "link1";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceTagOperationLink.get(
    resourceGroupName,
    serviceName,
    workspaceId,
    tagId,
    operationLinkId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementGetWorkspaceTagOperationLink();
}

main().catch(console.error);
