// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the policy configuration at the API level.
 *
 * @summary get the policy configuration at the API level.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetWorkspacePolicy.json
 */
async function apiManagementGetWorkspacePolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspacePolicy.get("rg1", "apimService1", "wks1", "policy");
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementGetWorkspacePolicy();
}

main().catch(console.error);
