// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns the developer portal's content item specified by its identifier.
 *
 * @summary returns the developer portal's content item specified by its identifier.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetContentTypeContentItem.json
 */
async function apiManagementGetContentTypeContentItem(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.contentItem.get(
    "rg1",
    "apimService1",
    "page",
    "4e3cf6a5-574a-ba08-1f23-2e7a38faa6d8",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementGetContentTypeContentItem();
}

main().catch(console.error);
