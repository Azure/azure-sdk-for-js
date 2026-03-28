// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to force Refresh the SSL certificate attached to the Custom Hostnames configured using secret from KeyVault on the Api Management service.
 *
 * @summary force Refresh the SSL certificate attached to the Custom Hostnames configured using secret from KeyVault on the Api Management service.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementServiceRefreshKeyVaultHostnames.json
 */
async function apiManagementServiceRefreshKeyVaultHostnames(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiManagementService.refreshHostnames("rg1", "apimService1");
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementServiceRefreshKeyVaultHostnames();
}

main().catch(console.error);
