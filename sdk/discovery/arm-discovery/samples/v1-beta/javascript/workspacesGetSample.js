// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DiscoveryClient } = require("@azure/arm-discovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Workspace
 *
 * @summary get a Workspace
 * x-ms-original-file: 2026-02-01-preview/Workspaces_Get_MaximumSet_Gen.json
 */
async function workspacesGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "C058B75F-64D2-4E9D-8B66-65339DCB22C7";
  const client = new DiscoveryClient(credential, subscriptionId);
  const result = await client.workspaces.get("rgdiscovery", "0e6a06e55e7efe8f07");
  console.log(result);
}

async function main() {
  await workspacesGetMaximumSet();
}

main().catch(console.error);
