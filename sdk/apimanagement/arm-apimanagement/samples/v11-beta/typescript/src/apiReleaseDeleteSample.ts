// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified release in the API.
 *
 * @summary deletes the specified release in the API.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteApiRelease.json
 */
async function apiManagementDeleteApiRelease(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.apiRelease.delete("rg1", "apimService1", "5a5fcc09124a7fa9b89f2f1d", "testrev", "*");
}

async function main(): Promise<void> {
  await apiManagementDeleteApiRelease();
}

main().catch(console.error);
