// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified workspace.
 *
 * @summary deletes the specified workspace.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteWorkspace.json
 */
async function apiManagementDeleteWorkspace(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.workspace.delete("rg1", "apimService1", "wks1", "*");
}

async function main(): Promise<void> {
  await apiManagementDeleteWorkspace();
}

main().catch(console.error);
