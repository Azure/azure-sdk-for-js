// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiscoveryClient } from "@azure/arm-discovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to approves or updates the specified private endpoint connection.
 *
 * @summary approves or updates the specified private endpoint connection.
 * x-ms-original-file: 2026-02-01-preview/WorkspacePrivateEndpointConnections_CreateOrUpdate_MaximumSet_Gen.json
 */
async function workspacePrivateEndpointConnectionsCreateOrUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "C058B75F-64D2-4E9D-8B66-65339DCB22C7";
  const client = new DiscoveryClient(credential, subscriptionId);
  const result = await client.workspacePrivateEndpointConnections.createOrUpdate(
    "rgdiscovery",
    "2b2ef1dfc273d99493",
    "connection",
    {
      properties: {
        privateEndpoint: {},
        privateLinkServiceConnectionState: {
          status: "Pending",
          description: "lknyprq",
          actionsRequired: "vgqhrxvmviabfgmafqtbej",
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await workspacePrivateEndpointConnectionsCreateOrUpdateMaximumSet();
}

main().catch(console.error);
