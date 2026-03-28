// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes specific tag of the workspace in an API Management service instance.
 *
 * @summary deletes specific tag of the workspace in an API Management service instance.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteWorkspaceTag.json
 */
async function apiManagementDeleteWorkspaceTag(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.workspaceTag.delete("rg1", "apimService1", "wks1", "tagId1", "*");
}

async function main(): Promise<void> {
  await apiManagementDeleteWorkspaceTag();
}

main().catch(console.error);
