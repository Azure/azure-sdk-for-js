// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the entity state version of the tag specified by its identifier.
 *
 * @summary gets the entity state version of the tag specified by its identifier.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementHeadWorkspaceTag.json
 */
async function apiManagementHeadWorkspaceTag(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.workspaceTag.getEntityState(
    "rg1",
    "apimService1",
    "wks1",
    "59306a29e4bbd510dc24e5f9",
  );
}

async function main(): Promise<void> {
  await apiManagementHeadWorkspaceTag();
}

main().catch(console.error);
