// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to checks that Group entity specified by identifier is associated with the Product entity.
 *
 * @summary checks that Group entity specified by identifier is associated with the Product entity.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementHeadProductGroup.json
 */
async function apiManagementHeadProductGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.productGroup.checkEntityExists(
    "rg1",
    "apimService1",
    "5931a75ae4bbd512a88c680b",
    "59306a29e4bbd510dc24e5f9",
  );
}

async function main(): Promise<void> {
  await apiManagementHeadProductGroup();
}

main().catch(console.error);
