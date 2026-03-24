// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to checks that user entity specified by identifier is associated with the group entity.
 *
 * @summary checks that user entity specified by identifier is associated with the group entity.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementHeadGroupUser.json
 */
async function apiManagementHeadGroupUser(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.groupUser.checkEntityExists(
    "rg1",
    "apimService1",
    "59306a29e4bbd510dc24e5f9",
    "5931a75ae4bbd512a88c680b",
  );
}

async function main(): Promise<void> {
  await apiManagementHeadGroupUser();
}

main().catch(console.error);
