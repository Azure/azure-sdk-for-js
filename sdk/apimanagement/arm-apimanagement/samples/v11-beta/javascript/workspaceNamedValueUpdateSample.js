// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates the specific named value.
 *
 * @summary updates the specific named value.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementUpdateWorkspaceNamedValue.json
 */
async function apiManagementUpdateWorkspaceNamedValue() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceNamedValue.update(
    "rg1",
    "apimService1",
    "wks1",
    "testprop2",
    "*",
    { displayName: "prop3name", secret: false, tags: ["foo", "bar2"], value: "propValue" },
  );
  console.log(result);
}

async function main() {
  await apiManagementUpdateWorkspaceNamedValue();
}

main().catch(console.error);
