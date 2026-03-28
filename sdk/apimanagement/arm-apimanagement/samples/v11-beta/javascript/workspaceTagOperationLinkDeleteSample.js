// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified operation from the specified tag.
 *
 * @summary deletes the specified operation from the specified tag.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteWorkspaceTagOperationLink.json
 */
async function apiManagementDeleteWorkspaceTagOperationLink() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.workspaceTagOperationLink.delete("rg1", "apimService1", "wks1", "tag1", "link1");
}

async function main() {
  await apiManagementDeleteWorkspaceTagOperationLink();
}

main().catch(console.error);
