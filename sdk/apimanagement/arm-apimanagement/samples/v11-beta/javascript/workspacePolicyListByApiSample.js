// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the policy configuration at the workspace level.
 *
 * @summary get the policy configuration at the workspace level.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListWorkspacePolicies.json
 */
async function apiManagementListWorkspacePolicies() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workspacePolicy.listByApi("rg1", "apimService1", "wks1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await apiManagementListWorkspacePolicies();
}

main().catch(console.error);
