// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  GroupCreateParameters,
  ApiManagementClient,
} from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates or Updates a group.
 *
 * @summary Creates or Updates a group.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementCreateWorkspaceGroup.json
 */
async function apiManagementCreateWorkspaceGroup(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const workspaceId = "wks1";
  const groupId = "tempgroup";
  const parameters: GroupCreateParameters = { displayName: "temp group" };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceGroup.createOrUpdate(
    resourceGroupName,
    serviceName,
    workspaceId,
    groupId,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or Updates a group.
 *
 * @summary Creates or Updates a group.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementCreateWorkspaceGroupExternal.json
 */
async function apiManagementCreateWorkspaceGroupExternal(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const workspaceId = "wks1";
  const groupId = "aadGroup";
  const parameters: GroupCreateParameters = {
    type: "external",
    description: "new group to test",
    displayName: "NewGroup (samiraad.onmicrosoft.com)",
    externalId:
      "aad://samiraad.onmicrosoft.com/groups/83cf2753-5831-4675-bc0e-2f8dc067c58d",
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceGroup.createOrUpdate(
    resourceGroupName,
    serviceName,
    workspaceId,
    groupId,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreateWorkspaceGroup();
  await apiManagementCreateWorkspaceGroupExternal();
}

main().catch(console.error);
