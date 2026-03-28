// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes specific user.
 *
 * @summary deletes specific user.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteUser.json
 */
async function apiManagementDeleteUser(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.user.delete("rg1", "apimService1", "5931a75ae4bbd512288c680b", "*");
}

async function main(): Promise<void> {
  await apiManagementDeleteUser();
}

main().catch(console.error);
