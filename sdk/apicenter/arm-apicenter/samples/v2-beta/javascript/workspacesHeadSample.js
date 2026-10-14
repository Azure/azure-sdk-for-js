// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiCenterClient } = require("@azure/arm-apicenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to checks if specified workspace exists.
 *
 * @summary checks if specified workspace exists.
 * x-ms-original-file: 2024-06-01-preview/Workspaces_Head.json
 */
async function workspacesHead() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiCenterClient(credential, subscriptionId);
  await client.workspaces.head("contoso-resources", "contoso", "default");
}

async function main() {
  await workspacesHead();
}

main().catch(console.error);
