// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a new Release for the API.
 *
 * @summary creates a new Release for the API.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateApiRelease.json
 */
async function apiManagementCreateApiRelease(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiRelease.createOrUpdate("rg1", "apimService1", "a1", "testrev", {
    apiId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.ApiManagement/service/apimService1/apis/a1",
    notes: "yahooagain",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreateApiRelease();
}

main().catch(console.error);
