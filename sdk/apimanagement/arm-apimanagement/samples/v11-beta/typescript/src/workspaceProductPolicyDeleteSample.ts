// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the policy configuration at the Product.
 *
 * @summary deletes the policy configuration at the Product.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteWorkspaceProductPolicy.json
 */
async function apiManagementDeleteWorkspaceProductPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.workspaceProductPolicy.delete(
    "rg1",
    "apimService1",
    "wks1",
    "testproduct",
    "policy",
    "*",
  );
}

async function main(): Promise<void> {
  await apiManagementDeleteWorkspaceProductPolicy();
}

main().catch(console.error);
