// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  GroupUpdateParameters,
  ApiManagementClient,
} from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Updates the details of the group specified by its identifier.
 *
 * @summary Updates the details of the group specified by its identifier.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementUpdateWorkspaceGroup.json
 */
async function apiManagementUpdateWorkspaceGroup(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const workspaceId = "wks1";
  const groupId = "tempgroup";
  const ifMatch = "*";
  const parameters: GroupUpdateParameters = { displayName: "temp group" };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceGroup.update(
    resourceGroupName,
    serviceName,
    workspaceId,
    groupId,
    ifMatch,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementUpdateWorkspaceGroup();
}

main().catch(console.error);
