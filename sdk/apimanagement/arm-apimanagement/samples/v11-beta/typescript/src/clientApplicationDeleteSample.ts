// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete client application.
 *
 * @summary delete client application.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteClientApplication.json
 */
async function apiManagementDeleteProduct(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.clientApplication.delete("rg1", "apimService1", "testAppId");
}

async function main(): Promise<void> {
  await apiManagementDeleteProduct();
}

main().catch(console.error);
