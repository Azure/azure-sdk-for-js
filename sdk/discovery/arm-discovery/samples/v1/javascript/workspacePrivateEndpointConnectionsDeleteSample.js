// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DiscoveryClient } = require("@azure/arm-discovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified private endpoint connection.
 *
 * @summary deletes the specified private endpoint connection.
 * x-ms-original-file: 2026-06-01/WorkspacePrivateEndpointConnections_Delete_MaximumSet_Gen.json
 */
async function workspacePrivateEndpointConnectionsDeleteMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "A54D43BD-2F5F-4BB1-95D4-9A8D23CC7DD4";
  const client = new DiscoveryClient(credential, subscriptionId);
  await client.workspacePrivateEndpointConnections.delete(
    "rgdiscovery",
    "2602de8dc5723c9502",
    "connection",
  );
}

async function main() {
  await workspacePrivateEndpointConnectionsDeleteMaximumSet();
}

main().catch(console.error);
