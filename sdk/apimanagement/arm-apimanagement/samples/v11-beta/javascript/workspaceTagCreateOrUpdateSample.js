// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a tag.
 *
 * @summary creates a tag.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateWorkspaceTag.json
 */
async function apiManagementCreateWorkspaceTag() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceTag.createOrUpdate("rg1", "apimService1", "wks1", "tagId1", {
    displayName: "tag1",
  });
  console.log(result);
}

async function main() {
  await apiManagementCreateWorkspaceTag();
}

main().catch(console.error);
