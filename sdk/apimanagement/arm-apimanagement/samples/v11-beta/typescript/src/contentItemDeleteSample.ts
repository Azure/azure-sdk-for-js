// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to removes the specified developer portal's content item.
 *
 * @summary removes the specified developer portal's content item.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteContentTypeContentItem.json
 */
async function apiManagementDeleteContentTypeContentItem(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.contentItem.delete(
    "rg1",
    "apimService1",
    "page",
    "4e3cf6a5-574a-ba08-1f23-2e7a38faa6d8",
    "*",
  );
}

async function main(): Promise<void> {
  await apiManagementDeleteContentTypeContentItem();
}

main().catch(console.error);
