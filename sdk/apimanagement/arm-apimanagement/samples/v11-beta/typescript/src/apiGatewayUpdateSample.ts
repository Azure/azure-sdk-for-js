// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates an existing API Management gateway.
 *
 * @summary updates an existing API Management gateway.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementUpdateStandardGateway.json
 */
async function apiManagementUpdateStandardGateway(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiGateway.update("rg1", "apimGateway1", {
    sku: { name: "Standard", capacity: 10 },
    tags: { Name: "Contoso", Test: "User" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementUpdateStandardGateway();
}

main().catch(console.error);
