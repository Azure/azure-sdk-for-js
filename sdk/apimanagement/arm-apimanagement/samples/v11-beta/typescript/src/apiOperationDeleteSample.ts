// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified operation in the API.
 *
 * @summary deletes the specified operation in the API.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteApiOperation.json
 */
async function apiManagementDeleteApiOperation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.apiOperation.delete(
    "rg1",
    "apimService1",
    "57d2ef278aa04f0888cba3f3",
    "57d2ef278aa04f0ad01d6cdc",
    "*",
  );
}

async function main(): Promise<void> {
  await apiManagementDeleteApiOperation();
}

main().catch(console.error);
