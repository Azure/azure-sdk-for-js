// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the details of the product specified by its identifier.
 *
 * @summary gets the details of the product specified by its identifier.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetWorkspaceProduct.json
 */
async function apiManagementGetWorkspaceProduct(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceProduct.get("rg1", "apimService1", "wks1", "unlimited");
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementGetWorkspaceProduct();
}

main().catch(console.error);
