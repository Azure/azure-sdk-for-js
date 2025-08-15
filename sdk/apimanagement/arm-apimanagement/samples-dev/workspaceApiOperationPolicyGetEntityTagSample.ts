// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the entity state (Etag) version of the API operation policy specified by its identifier.
 *
 * @summary Gets the entity state (Etag) version of the API operation policy specified by its identifier.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementHeadWorkspaceApiOperationPolicy.json
 */
async function apiManagementHeadWorkspaceApiOperationPolicy(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const workspaceId = "wks1";
  const apiId = "5600b539c53f5b0062040001";
  const operationId = "5600b53ac53f5b0062080006";
  const policyId = "policy";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceApiOperationPolicy.getEntityTag(
    resourceGroupName,
    serviceName,
    workspaceId,
    apiId,
    operationId,
    policyId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementHeadWorkspaceApiOperationPolicy();
}

main().catch(console.error);
