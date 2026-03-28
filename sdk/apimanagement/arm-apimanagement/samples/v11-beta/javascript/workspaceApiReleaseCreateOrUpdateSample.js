// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a new Release for the API.
 *
 * @summary creates a new Release for the API.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateWorkspaceApiRelease.json
 */
async function apiManagementCreateWorkspaceApiRelease() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceApiRelease.createOrUpdate(
    "rg1",
    "apimService1",
    "wks1",
    "a1",
    "testrev",
    {
      apiId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.ApiManagement/service/apimService1/workspaces/wks1/apis/a1",
      notes: "yahooagain",
    },
  );
  console.log(result);
}

async function main() {
  await apiManagementCreateWorkspaceApiRelease();
}

main().catch(console.error);
