// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a new tool in the API or updates an existing one.
 *
 * @summary creates a new tool in the API or updates an existing one.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateApiTool.json
 */
async function apiManagementCreateApiTool() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiTool.createOrUpdate(
    "rg1",
    "apimService1",
    "github-mcp-api",
    "createIssue",
    {
      operationId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.ApiManagement/service/apimService1/apis/github-rest-api/operations/createIssue",
      description: "This is a MCP tool to create an issue in a github repository",
      displayName: "createIssue",
    },
  );
  console.log(result);
}

async function main() {
  await apiManagementCreateApiTool();
}

main().catch(console.error);
