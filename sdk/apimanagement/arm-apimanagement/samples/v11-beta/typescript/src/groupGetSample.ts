// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the details of the group specified by its identifier.
 *
 * @summary gets the details of the group specified by its identifier.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetGroup.json
 */
async function apiManagementGetGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.group.get("rg1", "apimService1", "59306a29e4bbd510dc24e5f9");
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementGetGroup();
}

main().catch(console.error);
