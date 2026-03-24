// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to adds an API to the specified product via link.
 *
 * @summary adds an API to the specified product via link.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateWorkspaceProductApiLink.json
 */
async function apiManagementCreateWorkspaceProductApiLink() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceProductApiLink.createOrUpdate(
    "rg1",
    "apimService1",
    "wks1",
    "testproduct",
    "link1",
    {
      apiId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.ApiManagement/service/apimService1/workspaces/wks1/apis/echo-api",
    },
  );
  console.log(result);
}

async function main() {
  await apiManagementCreateWorkspaceProductApiLink();
}

main().catch(console.error);
