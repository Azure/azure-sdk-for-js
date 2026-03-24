// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the policy configuration at the Api Operation.
 *
 * @summary deletes the policy configuration at the Api Operation.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteWorkspaceApiOperationPolicy.json
 */
async function apiManagementDeleteWorkspaceApiOperationPolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.workspaceApiOperationPolicy.delete(
    "rg1",
    "apimService1",
    "wks1",
    "testapi",
    "testoperation",
    "policy",
    "*",
  );
}

async function main() {
  await apiManagementDeleteWorkspaceApiOperationPolicy();
}

main().catch(console.error);
