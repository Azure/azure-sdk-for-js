// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiscoveryClient } from "@azure/arm-discovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified private endpoint connection.
 *
 * @summary deletes the specified private endpoint connection.
 * x-ms-original-file: 2026-02-01-preview/WorkspacePrivateEndpointConnections_Delete_MaximumSet_Gen.json
 */
async function workspacePrivateEndpointConnectionsDeleteMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "C058B75F-64D2-4E9D-8B66-65339DCB22C7";
  const client = new DiscoveryClient(credential, subscriptionId);
  await client.workspacePrivateEndpointConnections.delete(
    "rgdiscovery",
    "1e2a3df721db9f3406",
    "connection",
  );
}

async function main(): Promise<void> {
  await workspacePrivateEndpointConnectionsDeleteMaximumSet();
}

main().catch(console.error);
