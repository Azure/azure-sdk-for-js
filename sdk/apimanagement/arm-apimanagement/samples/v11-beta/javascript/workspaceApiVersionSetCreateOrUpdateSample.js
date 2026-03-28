// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or Updates a Api Version Set.
 *
 * @summary creates or Updates a Api Version Set.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateWorkspaceApiVersionSet.json
 */
async function apiManagementCreateWorkspaceApiVersionSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceApiVersionSet.createOrUpdate(
    "rg1",
    "apimService1",
    "wks1",
    "api1",
    { description: "Version configuration", displayName: "api set 1", versioningScheme: "Segment" },
  );
  console.log(result);
}

async function main() {
  await apiManagementCreateWorkspaceApiVersionSet();
}

main().catch(console.error);
