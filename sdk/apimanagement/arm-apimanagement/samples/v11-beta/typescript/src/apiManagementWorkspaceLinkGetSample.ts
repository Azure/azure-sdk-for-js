// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets an API Management WorkspaceLink resource description.
 *
 * @summary gets an API Management WorkspaceLink resource description.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetWorkspaceLink.json
 */
async function apiManagementGetWorkspaceLinks(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiManagementWorkspaceLink.get("rg1", "service1", "wk-1");
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementGetWorkspaceLinks();
}

main().catch(console.error);
