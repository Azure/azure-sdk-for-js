// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get tenant access information details without secrets.
 *
 * @summary Get tenant access information details without secrets.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementGetTenantAccess.json
 */
async function apiManagementGetTenantAccess(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const accessName = "access";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.tenantAccess.get(
    resourceGroupName,
    serviceName,
    accessName,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Get tenant access information details without secrets.
 *
 * @summary Get tenant access information details without secrets.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2024-05-01/examples/ApiManagementGetTenantGitAccess.json
 */
async function apiManagementGetTenantGitAccess(): Promise<void> {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const accessName = "gitAccess";
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.tenantAccess.get(
    resourceGroupName,
    serviceName,
    accessName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementGetTenantAccess();
  await apiManagementGetTenantGitAccess();
}

main().catch(console.error);
