// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes specific tag of the API Management service instance.
 *
 * @summary deletes specific tag of the API Management service instance.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteTag.json
 */
async function apiManagementDeleteTag(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.tag.delete("rg1", "apimService1", "tagId1", "*");
}

async function main(): Promise<void> {
  await apiManagementDeleteTag();
}

main().catch(console.error);
