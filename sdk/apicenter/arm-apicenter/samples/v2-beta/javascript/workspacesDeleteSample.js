// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiCenterClient } = require("@azure/arm-apicenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes specified workspace.
 *
 * @summary deletes specified workspace.
 * x-ms-original-file: 2024-06-01-preview/Workspaces_Delete.json
 */
async function workspacesDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiCenterClient(credential, subscriptionId);
  await client.workspaces.delete("contoso-resources", "contoso", "default");
}

async function main() {
  await workspacesDelete();
}

main().catch(console.error);
