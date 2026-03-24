// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to adds an operation to the specified tag via link.
 *
 * @summary adds an operation to the specified tag via link.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateWorkspaceTagOperationLink.json
 */
async function apiManagementCreateWorkspaceTagOperationLink() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceTagOperationLink.createOrUpdate(
    "rg1",
    "apimService1",
    "wks1",
    "tag1",
    "link1",
    {
      operationId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.ApiManagement/service/apimService1/workspaces/wks1/apis/echo-api/operations/op1",
    },
  );
  console.log(result);
}

async function main() {
  await apiManagementCreateWorkspaceTagOperationLink();
}

main().catch(console.error);
