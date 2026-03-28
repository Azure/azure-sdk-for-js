// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the policy configuration at the Product level.
 *
 * @summary get the policy configuration at the Product level.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetWorkspaceProductPolicy.json
 */
async function apiManagementGetWorkspaceProductPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceProductPolicy.get(
    "rg1",
    "apimService1",
    "wks1",
    "kjoshiarmTemplateProduct4",
    "policy",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementGetWorkspaceProductPolicy();
}

main().catch(console.error);
