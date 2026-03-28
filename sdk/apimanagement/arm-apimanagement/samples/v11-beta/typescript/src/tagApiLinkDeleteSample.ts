// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified API from the specified tag.
 *
 * @summary deletes the specified API from the specified tag.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteTagApiLink.json
 */
async function apiManagementDeleteTagApiLink(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.tagApiLink.delete("rg1", "apimService1", "tag1", "link1");
}

async function main(): Promise<void> {
  await apiManagementDeleteTagApiLink();
}

main().catch(console.error);
