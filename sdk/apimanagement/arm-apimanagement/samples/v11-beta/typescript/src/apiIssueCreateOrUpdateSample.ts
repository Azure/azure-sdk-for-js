// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a new Issue for an API or updates an existing one.
 *
 * @summary creates a new Issue for an API or updates an existing one.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateApiIssue.json
 */
async function apiManagementCreateApiIssue(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiIssue.createOrUpdate(
    "rg1",
    "apimService1",
    "57d1f7558aa04f15146d9d8a",
    "57d2ef278aa04f0ad01d6cdc",
    {
      description: "New API issue description",
      createdDate: new Date("2018-02-01T22:21:20.467Z"),
      state: "open",
      title: "New API issue",
      userId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.ApiManagement/service/apimService1/users/1",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreateApiIssue();
}

main().catch(console.error);
