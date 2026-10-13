// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiCenterClient } = require("@azure/arm-apicenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates new or updates existing workspace.
 *
 * @summary creates new or updates existing workspace.
 * x-ms-original-file: 2024-06-01-preview/Workspaces_CreateOrUpdate.json
 */
async function workspacesCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiCenterClient(credential, subscriptionId);
  const result = await client.workspaces.createOrUpdate("contoso-resources", "contoso", "default", {
    properties: { title: "default" },
  });
  console.log(result);
}

async function main() {
  await workspacesCreateOrUpdate();
}

main().catch(console.error);
