// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the list of policy configuration at the API Operation level.
 *
 * @summary get the list of policy configuration at the API Operation level.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListWorkspaceApiOperationPolicies.json
 */
async function apiManagementListWorkspaceApiOperationPolicies() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workspaceApiOperationPolicy.listByOperation(
    "rg1",
    "apimService1",
    "wks1",
    "599e2953193c3c0bd0b3e2fa",
    "599e29ab193c3c0bd0b3e2fb",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await apiManagementListWorkspaceApiOperationPolicies();
}

main().catch(console.error);
