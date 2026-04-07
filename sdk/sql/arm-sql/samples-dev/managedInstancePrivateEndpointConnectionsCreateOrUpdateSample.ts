// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to approve or reject a private endpoint connection with a given name.
 *
 * @summary approve or reject a private endpoint connection with a given name.
 * x-ms-original-file: 2025-02-01-preview/ManagedInstancePrivateEndpointConnectionUpdate.json
 */
async function approveOrRejectAPrivateEndpointConnectionWithAGivenName(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.managedInstancePrivateEndpointConnections.createOrUpdate(
    "Default",
    "test-cl",
    "private-endpoint-connection-name",
    {
      privateLinkServiceConnectionState: {
        description: "Approved by johndoe@contoso.com",
        status: "Approved",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await approveOrRejectAPrivateEndpointConnectionWithAGivenName();
}

main().catch(console.error);
