// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the details of the API specified by its identifier.
 *
 * @summary Gets the details of the API specified by its identifier.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementGetWorkspaceApiContract.json
 */
async function apiManagementGetWorkspaceApiContract(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const workspaceId = "wks1";
  const apiId = "57d1f7558aa04f15146d9d8a";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceApi.get(
    resourceGroupName,
    serviceName,
    workspaceId,
    apiId,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Gets the details of the API specified by its identifier.
 *
 * @summary Gets the details of the API specified by its identifier.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementGetWorkspaceApiRevision.json
 */
async function apiManagementGetWorkspaceApiRevision(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const workspaceId = "wks1";
  const apiId = "echo-api;rev=3";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceApi.get(
    resourceGroupName,
    serviceName,
    workspaceId,
    apiId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementGetWorkspaceApiContract();
  await apiManagementGetWorkspaceApiRevision();
}

main().catch(console.error);
