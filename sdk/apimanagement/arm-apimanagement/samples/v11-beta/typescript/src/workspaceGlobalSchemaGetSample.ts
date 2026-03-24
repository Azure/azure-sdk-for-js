// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the details of the Schema specified by its identifier.
 *
 * @summary gets the details of the Schema specified by its identifier.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetWorkspaceSchema.json
 */
async function apiManagementGetWorkspaceSchema(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceGlobalSchema.get("rg1", "apimService1", "wks1", "schema1");
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementGetWorkspaceSchema();
}

main().catch(console.error);
