// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the ETag of the policy configuration at the Product level.
 *
 * @summary get the ETag of the policy configuration at the Product level.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementHeadWorkspaceProductPolicy.json
 */
async function apiManagementHeadWorkspaceProductPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.workspaceProductPolicy.getEntityTag(
    "rg1",
    "apimService1",
    "wks1",
    "unlimited",
    "policy",
  );
}

async function main(): Promise<void> {
  await apiManagementHeadWorkspaceProductPolicy();
}

main().catch(console.error);
