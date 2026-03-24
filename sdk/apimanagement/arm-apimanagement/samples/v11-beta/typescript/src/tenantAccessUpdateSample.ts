// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update tenant access information details.
 *
 * @summary update tenant access information details.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementUpdateTenantAccess.json
 */
async function apiManagementUpdateTenantAccess(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.tenantAccess.update("rg1", "apimService1", "access", "*", {
    enabled: true,
  });
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementUpdateTenantAccess();
}

main().catch(console.error);
