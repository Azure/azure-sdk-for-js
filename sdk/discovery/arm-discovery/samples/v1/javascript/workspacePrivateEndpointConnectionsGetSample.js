// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DiscoveryClient } = require("@azure/arm-discovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified private endpoint connection associated with the workspace.
 *
 * @summary gets the specified private endpoint connection associated with the workspace.
 * x-ms-original-file: 2026-06-01/WorkspacePrivateEndpointConnections_Get_MaximumSet_Gen.json
 */
async function workspacePrivateEndpointConnectionsGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "A54D43BD-2F5F-4BB1-95D4-9A8D23CC7DD4";
  const client = new DiscoveryClient(credential, subscriptionId);
  const result = await client.workspacePrivateEndpointConnections.get(
    "rgdiscovery",
    "de936b8038cf3dc9ad",
    "connection",
  );
  console.log(result);
}

async function main() {
  await workspacePrivateEndpointConnectionsGetMaximumSet();
}

main().catch(console.error);
