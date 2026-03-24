// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to assign tag to the Operation.
 *
 * @summary assign tag to the Operation.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateApiOperationTag.json
 */
async function apiManagementCreateApiOperationTag(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.tag.assignToOperation(
    "rg1",
    "apimService1",
    "5931a75ae4bbd512a88c680b",
    "5931a75ae4bbd512a88c680a",
    "tagId1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreateApiOperationTag();
}

main().catch(console.error);
