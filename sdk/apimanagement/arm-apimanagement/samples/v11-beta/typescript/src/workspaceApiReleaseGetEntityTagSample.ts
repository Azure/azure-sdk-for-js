// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns the etag of an API release.
 *
 * @summary returns the etag of an API release.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementHeadWorkspaceApiRelease.json
 */
async function apiManagementHeadWorkspaceApiRelease(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.workspaceApiRelease.getEntityTag(
    "rg1",
    "apimService1",
    "wks1",
    "a1",
    "5a7cb545298324c53224a799",
  );
}

async function main(): Promise<void> {
  await apiManagementHeadWorkspaceApiRelease();
}

main().catch(console.error);
