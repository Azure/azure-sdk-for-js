// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to approves or rejects a private endpoint connection.
 *
 * @summary approves or rejects a private endpoint connection.
 * x-ms-original-file: 2026-05-01-preview/PrivateEndpointConnections_UpdateStatus.json
 */
async function approveOrRejectAPrivateEndpointConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.horizonDbPrivateEndpointConnections.updateStatus(
    "exampleresourcegroup",
    "examplecluster",
    "exampleprivateendpointconnection.1fa229cd-bf3f-47f0-8c49-afb36723997e",
    {
      properties: {
        privateLinkServiceConnectionState: {
          status: "Approved",
          description: "Approved by johndoe@contoso.com",
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await approveOrRejectAPrivateEndpointConnection();
}

main().catch(console.error);
