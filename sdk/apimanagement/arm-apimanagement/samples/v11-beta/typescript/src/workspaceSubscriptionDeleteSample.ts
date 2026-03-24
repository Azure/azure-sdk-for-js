// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified subscription.
 *
 * @summary deletes the specified subscription.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteWorkspaceSubscription.json
 */
async function apiManagementDeleteWorkspaceSubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.workspaceSubscription.delete("rg1", "apimService1", "wks1", "testsub", "*");
}

async function main(): Promise<void> {
  await apiManagementDeleteWorkspaceSubscription();
}

main().catch(console.error);
