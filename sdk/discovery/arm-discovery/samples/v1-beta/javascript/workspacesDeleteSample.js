// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DiscoveryClient } = require("@azure/arm-discovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Workspace
 *
 * @summary delete a Workspace
 * x-ms-original-file: 2026-02-01-preview/Workspaces_Delete_MaximumSet_Gen.json
 */
async function workspacesDeleteMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "C058B75F-64D2-4E9D-8B66-65339DCB22C7";
  const client = new DiscoveryClient(credential, subscriptionId);
  await client.workspaces.delete("rgdiscovery", "f1559ab1ef72a2eae5");
}

async function main() {
  await workspacesDeleteMaximumSet();
}

main().catch(console.error);
