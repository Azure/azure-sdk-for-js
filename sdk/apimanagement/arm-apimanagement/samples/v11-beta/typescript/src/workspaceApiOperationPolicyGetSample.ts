// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the policy configuration at the API Operation level.
 *
 * @summary get the policy configuration at the API Operation level.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetWorkspaceApiOperationPolicy.json
 */
async function apiManagementGetWorkspaceApiOperationPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceApiOperationPolicy.get(
    "rg1",
    "apimService1",
    "wks1",
    "5600b539c53f5b0062040001",
    "5600b53ac53f5b0062080006",
    "policy",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementGetWorkspaceApiOperationPolicy();
}

main().catch(console.error);
