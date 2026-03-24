// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to adds an API to the specified tag via link.
 *
 * @summary adds an API to the specified tag via link.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateWorkspaceTagApiLink.json
 */
async function apiManagementCreateWorkspaceTagApiLink(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceTagApiLink.createOrUpdate(
    "rg1",
    "apimService1",
    "wks1",
    "tag1",
    "link1",
    {
      apiId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.ApiManagement/service/apimService1/workspaces/wks1/apis/echo-api",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreateWorkspaceTagApiLink();
}

main().catch(console.error);
