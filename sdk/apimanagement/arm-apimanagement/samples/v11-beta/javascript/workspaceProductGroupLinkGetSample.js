// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the group link for the product.
 *
 * @summary gets the group link for the product.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetWorkspaceProductGroupLink.json
 */
async function apiManagementGetWorkspaceProductGroupLink() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceProductGroupLink.get(
    "rg1",
    "apimService1",
    "wks1",
    "testproduct",
    "link1",
  );
  console.log(result);
}

async function main() {
  await apiManagementGetWorkspaceProductGroupLink();
}

main().catch(console.error);
