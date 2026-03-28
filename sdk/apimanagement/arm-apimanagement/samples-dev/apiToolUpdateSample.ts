// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the details of the tool in the API specified by its identifier.
 *
 * @summary updates the details of the tool in the API specified by its identifier.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementUpdateApiTool.json
 */
async function apiManagementUpdateApiTool(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiTool.update(
    "rg1",
    "apimService1",
    "github-mcp-api",
    "createIssue",
    { description: "This is updated description", displayName: "createIssue" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementUpdateApiTool();
}

main().catch(console.error);
