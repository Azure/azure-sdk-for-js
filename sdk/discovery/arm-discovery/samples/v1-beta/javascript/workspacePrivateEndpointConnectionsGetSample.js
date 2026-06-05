// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DiscoveryClient } = require("@azure/arm-discovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified private endpoint connection associated with the workspace.
 *
 * @summary gets the specified private endpoint connection associated with the workspace.
 * x-ms-original-file: 2026-02-01-preview/WorkspacePrivateEndpointConnections_Get_MaximumSet_Gen.json
 */
async function workspacePrivateEndpointConnectionsGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "C058B75F-64D2-4E9D-8B66-65339DCB22C7";
  const client = new DiscoveryClient(credential, subscriptionId);
  const result = await client.workspacePrivateEndpointConnections.get(
    "rgdiscovery",
    "16e7096454e0394819",
    "connection",
  );
  console.log(result);
}

async function main() {
  await workspacePrivateEndpointConnectionsGetMaximumSet();
}

main().catch(console.error);
