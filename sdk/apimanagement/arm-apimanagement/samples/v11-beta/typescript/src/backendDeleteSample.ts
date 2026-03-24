// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified backend.
 *
 * @summary deletes the specified backend.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteBackend.json
 */
async function apiManagementDeleteBackend(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.backend.delete("rg1", "apimService1", "sfbackend", "*");
}

async function main(): Promise<void> {
  await apiManagementDeleteBackend();
}

main().catch(console.error);
