// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to action is invalidating all debug credentials issued for gateway.
 *
 * @summary action is invalidating all debug credentials issued for gateway.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGatewayInvalidateDebugCredentials.json
 */
async function apiManagementGatewayInvalidateDebugCredentials(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.gateway.invalidateDebugCredentials("rg1", "apimService1", "gw1");
}

async function main(): Promise<void> {
  await apiManagementGatewayInvalidateDebugCredentials();
}

main().catch(console.error);
