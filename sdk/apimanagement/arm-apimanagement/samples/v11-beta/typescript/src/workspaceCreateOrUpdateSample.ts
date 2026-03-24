// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a new workspace or updates an existing one.
 *
 * @summary creates a new workspace or updates an existing one.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateWorkspace.json
 */
async function apiManagementCreateWorkspace(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspace.createOrUpdate("rg1", "apimService1", "wks1", {
    description: "workspace 1",
    displayName: "my workspace",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreateWorkspace();
}

main().catch(console.error);
