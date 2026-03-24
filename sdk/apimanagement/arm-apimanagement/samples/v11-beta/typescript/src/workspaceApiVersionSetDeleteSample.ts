// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes specific Api Version Set.
 *
 * @summary deletes specific Api Version Set.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteWorkspaceApiVersionSet.json
 */
async function apiManagementDeleteWorkspaceApiVersionSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.workspaceApiVersionSet.delete("rg1", "apimService1", "wks1", "a1", "*");
}

async function main(): Promise<void> {
  await apiManagementDeleteWorkspaceApiVersionSet();
}

main().catch(console.error);
