// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes specific Schema.
 *
 * @summary deletes specific Schema.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteGlobalSchema.json
 */
async function apiManagementDeleteSchema(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.globalSchema.delete("rg1", "apimService1", "schema1", "*");
}

async function main(): Promise<void> {
  await apiManagementDeleteSchema();
}

main().catch(console.error);
