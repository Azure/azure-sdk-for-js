// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates policy configuration for the API.
 *
 * @summary creates or updates policy configuration for the API.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateWorkspaceApiPolicy.json
 */
async function apiManagementCreateWorkspaceApiPolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceApiPolicy.createOrUpdate(
    "rg1",
    "apimService1",
    "wks1",
    "5600b57e7e8880006a040001",
    "policy",
    {
      format: "xml",
      value:
        "<policies> <inbound /> <backend>    <forward-request />  </backend>  <outbound /></policies>",
    },
    { ifMatch: "*" },
  );
  console.log(result);
}

async function main() {
  await apiManagementCreateWorkspaceApiPolicy();
}

main().catch(console.error);
