// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RelayAPI } from "@azure/arm-relay";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates PrivateEndpointConnections of service namespace.
 *
 * @summary creates or updates PrivateEndpointConnections of service namespace.
 * x-ms-original-file: 2024-01-01/PrivateEndpointConnections/PrivateEndpointConnectionsCreate.json
 */
async function nameSpacePrivateEndPointConnectionCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new RelayAPI(credential, subscriptionId);
  const result = await client.privateEndpointConnections.createOrUpdate(
    "resourcegroup",
    "example-RelayNamespace-5849",
    "{privateEndpointConnection name}",
    {
      properties: {
        privateEndpoint: {
          id: "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/resourcegroup/providers/Microsoft.Network/privateEndpoints/ali-relay-pve-1",
        },
        privateLinkServiceConnectionState: {
          description: "You may pass",
          status: "Approved",
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await nameSpacePrivateEndPointConnectionCreate();
}

main().catch(console.error);
