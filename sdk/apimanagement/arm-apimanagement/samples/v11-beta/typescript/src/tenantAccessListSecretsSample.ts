// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get tenant access information details.
 *
 * @summary get tenant access information details.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListSecretsTenantAccess.json
 */
async function apiManagementListSecretsTenantAccess(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.tenantAccess.listSecrets("rg1", "apimService1", "access");
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementListSecretsTenantAccess();
}

main().catch(console.error);
