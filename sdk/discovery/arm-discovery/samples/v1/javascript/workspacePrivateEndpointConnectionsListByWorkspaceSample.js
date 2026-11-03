// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DiscoveryClient } = require("@azure/arm-discovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all private endpoint connections for a workspace.
 *
 * @summary lists all private endpoint connections for a workspace.
 * x-ms-original-file: 2026-06-01/WorkspacePrivateEndpointConnections_ListByWorkspace_MaximumSet_Gen.json
 */
async function workspacePrivateEndpointConnectionsListByWorkspaceMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "A54D43BD-2F5F-4BB1-95D4-9A8D23CC7DD4";
  const client = new DiscoveryClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workspacePrivateEndpointConnections.listByWorkspace(
    "rgdiscovery",
    "704cee821b47e58afe",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await workspacePrivateEndpointConnectionsListByWorkspaceMaximumSet();
}

main().catch(console.error);
