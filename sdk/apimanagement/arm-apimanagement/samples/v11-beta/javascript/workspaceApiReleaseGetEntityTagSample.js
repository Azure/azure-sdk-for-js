// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns the etag of an API release.
 *
 * @summary returns the etag of an API release.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementHeadWorkspaceApiRelease.json
 */
async function apiManagementHeadWorkspaceApiRelease() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.workspaceApiRelease.getEntityTag(
    "rg1",
    "apimService1",
    "wks1",
    "a1",
    "5a7cb545298324c53224a799",
  );
}

async function main() {
  await apiManagementHeadWorkspaceApiRelease();
}

main().catch(console.error);
