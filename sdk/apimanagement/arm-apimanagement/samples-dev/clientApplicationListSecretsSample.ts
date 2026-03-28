// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrived client application secrets.
 *
 * @summary retrived client application secrets.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListClientApplicationSecrets.json
 */
async function apiManagementListProducts(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.clientApplication.listSecrets("rg1", "apimService1", "testAppId");
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementListProducts();
}

main().catch(console.error);
