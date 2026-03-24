// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates the details of the group specified by its identifier.
 *
 * @summary updates the details of the group specified by its identifier.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementUpdateWorkspaceGroup.json
 */
async function apiManagementUpdateWorkspaceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceGroup.update(
    "rg1",
    "apimService1",
    "wks1",
    "tempgroup",
    "*",
    { displayName: "temp group" },
  );
  console.log(result);
}

async function main() {
  await apiManagementUpdateWorkspaceGroup();
}

main().catch(console.error);
