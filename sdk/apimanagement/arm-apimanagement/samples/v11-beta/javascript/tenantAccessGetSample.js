// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get tenant access information details without secrets.
 *
 * @summary get tenant access information details without secrets.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetTenantAccess.json
 */
async function apiManagementGetTenantAccess() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.tenantAccess.get("rg1", "apimService1", "access");
  console.log(result);
}

/**
 * This sample demonstrates how to get tenant access information details without secrets.
 *
 * @summary get tenant access information details without secrets.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetTenantGitAccess.json
 */
async function apiManagementGetTenantGitAccess() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.tenantAccess.get("rg1", "apimService1", "gitAccess");
  console.log(result);
}

async function main() {
  await apiManagementGetTenantAccess();
  await apiManagementGetTenantGitAccess();
}

main().catch(console.error);
