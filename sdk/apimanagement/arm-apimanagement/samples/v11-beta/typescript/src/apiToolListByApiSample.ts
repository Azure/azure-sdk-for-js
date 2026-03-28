// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists a collection of the MCP tools for the specified API.
 *
 * @summary lists a collection of the MCP tools for the specified API.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListApiTools.json
 */
async function apiManagementListApiTools(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.apiTool.listByApi("rg1", "apimService1", "github-mcp-api")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await apiManagementListApiTools();
}

main().catch(console.error);
