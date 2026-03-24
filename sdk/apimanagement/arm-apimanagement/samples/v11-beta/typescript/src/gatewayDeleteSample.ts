// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes specific Gateway.
 *
 * @summary deletes specific Gateway.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteGateway.json
 */
async function apiManagementDeleteGateway(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.gateway.delete("rg1", "apimService1", "gw1", "*");
}

async function main(): Promise<void> {
  await apiManagementDeleteGateway();
}

main().catch(console.error);
