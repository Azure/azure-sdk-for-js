// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get tenant settings.
 *
 * @summary get tenant settings.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetTenantSettings.json
 */
async function apiManagementGetTenantSettings(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.tenantSettings.get("rg1", "apimService1", "public");
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementGetTenantSettings();
}

main().catch(console.error);
