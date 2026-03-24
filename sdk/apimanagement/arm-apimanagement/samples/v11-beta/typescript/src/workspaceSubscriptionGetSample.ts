// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified Subscription entity.
 *
 * @summary gets the specified Subscription entity.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetWorkspaceSubscription.json
 */
async function apiManagementGetWorkspaceSubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceSubscription.get(
    "rg1",
    "apimService1",
    "wks1",
    "5931a769d8d14f0ad8ce13b8",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementGetWorkspaceSubscription();
}

main().catch(console.error);
