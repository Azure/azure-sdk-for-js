// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the details of the tag specified by its identifier.
 *
 * @summary updates the details of the tag specified by its identifier.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementUpdateWorkspaceTag.json
 */
async function apiManagementUpdateWorkspaceTag(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceTag.update("rg1", "apimService1", "wks1", "temptag", "*", {
    displayName: "temp tag",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementUpdateWorkspaceTag();
}

main().catch(console.error);
