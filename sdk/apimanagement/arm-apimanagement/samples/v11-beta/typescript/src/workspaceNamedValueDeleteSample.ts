// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes specific named value from the workspace in an API Management service instance.
 *
 * @summary deletes specific named value from the workspace in an API Management service instance.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteWorkspaceNamedValue.json
 */
async function apiManagementDeleteWorkspaceNamedValue(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.workspaceNamedValue.delete("rg1", "apimService1", "wks1", "testprop2", "*");
}

async function main(): Promise<void> {
  await apiManagementDeleteWorkspaceNamedValue();
}

main().catch(console.error);
