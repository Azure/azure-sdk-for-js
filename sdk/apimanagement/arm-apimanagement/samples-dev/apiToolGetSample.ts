// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the details of the API Tool specified by its identifier.
 *
 * @summary gets the details of the API Tool specified by its identifier.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetApiTool.json
 */
async function apiManagementGetApiTool(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiTool.get(
    "rg1",
    "apimService1",
    "github-mcp-api",
    "findRepositories",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementGetApiTool();
}

main().catch(console.error);
