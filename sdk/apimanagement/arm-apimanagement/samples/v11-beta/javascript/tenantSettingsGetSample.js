// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get tenant settings.
 *
 * @summary get tenant settings.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetTenantSettings.json
 */
async function apiManagementGetTenantSettings() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.tenantSettings.get("rg1", "apimService1", "public");
  console.log(result);
}

async function main() {
  await apiManagementGetTenantSettings();
}

main().catch(console.error);
