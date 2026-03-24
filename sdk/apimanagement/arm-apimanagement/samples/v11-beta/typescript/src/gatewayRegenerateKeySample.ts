// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to regenerates specified gateway key invalidating any tokens created with it.
 *
 * @summary regenerates specified gateway key invalidating any tokens created with it.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGatewayRegenerateKey.json
 */
async function apiManagementGatewayRegenerateKey(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.gateway.regenerateKey("rg1", "apimService1", "gwId", { keyType: "primary" });
}

async function main(): Promise<void> {
  await apiManagementGatewayRegenerateKey();
}

main().catch(console.error);
