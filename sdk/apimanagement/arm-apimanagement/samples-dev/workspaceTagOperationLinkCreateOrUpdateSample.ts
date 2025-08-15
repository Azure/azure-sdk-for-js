// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  TagOperationLinkContract,
  ApiManagementClient,
} from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Adds an operation to the specified tag via link.
 *
 * @summary Adds an operation to the specified tag via link.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementCreateWorkspaceTagOperationLink.json
 */
async function apiManagementCreateWorkspaceTagOperationLink(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const workspaceId = "wks1";
  const tagId = "tag1";
  const operationLinkId = "link1";
  const parameters: TagOperationLinkContract = {
    operationId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.ApiManagement/service/apimService1/workspaces/wks1/apis/echo-api/operations/op1",
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceTagOperationLink.createOrUpdate(
    resourceGroupName,
    serviceName,
    workspaceId,
    tagId,
    operationLinkId,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreateWorkspaceTagOperationLink();
}

main().catch(console.error);
