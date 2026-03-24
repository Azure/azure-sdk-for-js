// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or Updates a group.
 *
 * @summary creates or Updates a group.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateWorkspaceGroup.json
 */
async function apiManagementCreateWorkspaceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceGroup.createOrUpdate(
    "rg1",
    "apimService1",
    "wks1",
    "tempgroup",
    { displayName: "temp group" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or Updates a group.
 *
 * @summary creates or Updates a group.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateWorkspaceGroupExternal.json
 */
async function apiManagementCreateWorkspaceGroupExternal(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceGroup.createOrUpdate(
    "rg1",
    "apimService1",
    "wks1",
    "aadGroup",
    {
      type: "external",
      description: "new group to test",
      displayName: "NewGroup (samiraad.onmicrosoft.com)",
      externalId: "aad://samiraad.onmicrosoft.com/groups/83cf2753-5831-4675-bc0e-2f8dc067c58d",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreateWorkspaceGroup();
  await apiManagementCreateWorkspaceGroupExternal();
}

main().catch(console.error);
