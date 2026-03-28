// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the operation link for the tag.
 *
 * @summary gets the operation link for the tag.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetTagOperationLink.json
 */
async function apiManagementGetTagOperationLink(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.tagOperationLink.get("rg1", "apimService1", "tag1", "link1");
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementGetTagOperationLink();
}

main().catch(console.error);
