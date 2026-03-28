// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the details of the tag specified by its identifier.
 *
 * @summary gets the details of the tag specified by its identifier.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetWorkspaceTag.json
 */
async function apiManagementGetWorkspaceTag() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceTag.get(
    "rg1",
    "apimService1",
    "wks1",
    "59306a29e4bbd510dc24e5f9",
  );
  console.log(result);
}

async function main() {
  await apiManagementGetWorkspaceTag();
}

main().catch(console.error);
