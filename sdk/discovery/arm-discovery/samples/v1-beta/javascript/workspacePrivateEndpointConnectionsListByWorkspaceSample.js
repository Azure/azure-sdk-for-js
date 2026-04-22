// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DiscoveryClient } = require("@azure/arm-discovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all private endpoint connections for a workspace.
 *
 * @summary lists all private endpoint connections for a workspace.
 * x-ms-original-file: 2026-02-01-preview/WorkspacePrivateEndpointConnections_ListByWorkspace_MaximumSet_Gen.json
 */
async function workspacePrivateEndpointConnectionsListByWorkspaceMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "C058B75F-64D2-4E9D-8B66-65339DCB22C7";
  const client = new DiscoveryClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workspacePrivateEndpointConnections.listByWorkspace(
    "rgdiscovery",
    "cc28db0ff1bebbe39b",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await workspacePrivateEndpointConnectionsListByWorkspaceMaximumSet();
}

main().catch(console.error);
