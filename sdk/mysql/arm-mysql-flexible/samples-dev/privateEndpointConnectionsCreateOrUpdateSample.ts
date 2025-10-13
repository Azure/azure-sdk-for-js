// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MySQLManagementFlexibleServerClient } from "@azure/arm-mysql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to approve or reject a private endpoint connection with a given name.
 *
 * @summary approve or reject a private endpoint connection with a given name.
 * x-ms-original-file: 2024-12-30/PrivateEndpointConnectionUpdate.json
 */
async function approveOrRejectAPrivateEndpointConnectionWithAGivenName(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.createOrUpdate(
    "Default",
    "test-svr",
    "private-endpoint-connection-name",
    {
      properties: {
        privateLinkServiceConnectionState: {
          description: "Approved by johndoe@contoso.com",
          status: "Approved",
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await approveOrRejectAPrivateEndpointConnectionWithAGivenName();
}

main().catch(console.error);
