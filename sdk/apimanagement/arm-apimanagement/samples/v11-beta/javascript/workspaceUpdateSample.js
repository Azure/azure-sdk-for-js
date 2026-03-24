// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates the details of the workspace specified by its identifier.
 *
 * @summary updates the details of the workspace specified by its identifier.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementUpdateWorkspace.json
 */
async function apiManagementUpdateWorkspace() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspace.update("rg1", "apimService1", "wks1", "*", {
    description: "workspace 1",
    displayName: "my workspace",
  });
  console.log(result);
}

async function main() {
  await apiManagementUpdateWorkspace();
}

main().catch(console.error);
