// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to assign tag to the Api.
 *
 * @summary assign tag to the Api.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateApiTag.json
 */
async function apiManagementCreateApiTag(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.tag.assignToApi(
    "rg1",
    "apimService1",
    "5931a75ae4bbd512a88c680b",
    "tagId1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreateApiTag();
}

main().catch(console.error);
