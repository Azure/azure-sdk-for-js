// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update tenant access information details.
 *
 * @summary update tenant access information details.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateTenantAccess.json
 */
async function apiManagementCreateTenantAccess() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.tenantAccess.create("rg1", "apimService1", "access", "*", {
    enabled: true,
  });
  console.log(result);
}

async function main() {
  await apiManagementCreateTenantAccess();
}

main().catch(console.error);
