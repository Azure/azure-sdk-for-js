// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns the details of an API release.
 *
 * @summary returns the details of an API release.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetWorkspaceApiRelease.json
 */
async function apiManagementGetWorkspaceApiRelease(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceApiRelease.get(
    "rg1",
    "apimService1",
    "wks1",
    "a1",
    "5a7cb545298324c53224a799",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementGetWorkspaceApiRelease();
}

main().catch(console.error);
