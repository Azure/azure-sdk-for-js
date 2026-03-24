// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates the subscription of specified user to the specified product.
 *
 * @summary creates or updates the subscription of specified user to the specified product.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateWorkspaceSubscription.json
 */
async function apiManagementCreateWorkspaceSubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceSubscription.createOrUpdate(
    "rg1",
    "apimService1",
    "wks1",
    "testsub",
    {
      displayName: "testsub",
      ownerId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.ApiManagement/service/apimService1/users/57127d485157a511ace86ae7",
      scope:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.ApiManagement/service/apimService1/workspaces/wks1/products/5600b59475ff190048060002",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreateWorkspaceSubscription();
}

main().catch(console.error);
