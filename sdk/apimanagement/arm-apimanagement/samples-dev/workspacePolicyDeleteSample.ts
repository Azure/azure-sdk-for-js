// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes the policy configuration at the workspace.
 *
 * @summary Deletes the policy configuration at the workspace.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementDeleteWorkspacePolicy.json
 */

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiManagementDeleteWorkspacePolicy(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const workspaceId = "wks1";
  const policyId = "policy";
  const ifMatch = "*";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspacePolicy.delete(
    resourceGroupName,
    serviceName,
    workspaceId,
    policyId,
    ifMatch,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementDeleteWorkspacePolicy();
}

main().catch(console.error);
