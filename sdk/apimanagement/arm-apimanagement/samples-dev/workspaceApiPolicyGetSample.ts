// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get the policy configuration at the API level.
 *
 * @summary Get the policy configuration at the API level.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementGetWorkspaceApiPolicy.json
 */

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiManagementGetWorkspaceApiPolicy(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const workspaceId = "wks1";
  const apiId = "5600b59475ff190048040001";
  const policyId = "policy";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceApiPolicy.get(
    resourceGroupName,
    serviceName,
    workspaceId,
    apiId,
    policyId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementGetWorkspaceApiPolicy();
}

main().catch(console.error);
