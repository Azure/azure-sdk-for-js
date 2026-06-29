// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiCenterClient } = require("@azure/arm-apicenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns details of the workspace.
 *
 * @summary returns details of the workspace.
 * x-ms-original-file: 2024-06-01-preview/Workspaces_Get.json
 */
async function workspacesGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiCenterClient(credential, subscriptionId);
  const result = await client.workspaces.get("contoso-resources", "contoso", "default");
  console.log(result);
}

async function main() {
  await workspacesGet();
}

main().catch(console.error);
