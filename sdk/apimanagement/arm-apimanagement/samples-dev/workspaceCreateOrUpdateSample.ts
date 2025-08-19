// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates a new workspace or updates an existing one.
 *
 * @summary Creates a new workspace or updates an existing one.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementCreateWorkspace.json
 */

import {
  WorkspaceContract,
  ApiManagementClient,
} from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiManagementCreateWorkspace(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const workspaceId = "wks1";
  const parameters: WorkspaceContract = {
    description: "workspace 1",
    displayName: "my workspace",
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspace.createOrUpdate(
    resourceGroupName,
    serviceName,
    workspaceId,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreateWorkspace();
}

main().catch(console.error);
