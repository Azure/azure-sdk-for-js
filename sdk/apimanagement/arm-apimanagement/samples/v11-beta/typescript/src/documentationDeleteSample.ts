// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified Documentation from an API.
 *
 * @summary deletes the specified Documentation from an API.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteDocumentation.json
 */
async function apiManagementDeleteDocumentation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.documentation.delete("rg1", "apimService1", "57d1f7558aa04f15146d9d8a", "*");
}

async function main(): Promise<void> {
  await apiManagementDeleteDocumentation();
}

main().catch(console.error);
