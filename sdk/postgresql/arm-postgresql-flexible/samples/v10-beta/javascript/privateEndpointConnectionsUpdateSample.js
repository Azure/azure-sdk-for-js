// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to approves or rejects a private endpoint connection.
 *
 * @summary approves or rejects a private endpoint connection.
 * x-ms-original-file: 2026-01-01-preview/PrivateEndpointConnectionsUpdate.json
 */
async function approveOrRejectAPrivateEndpointConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.update(
    "exampleresourcegroup",
    "exampleserver",
    "private-endpoint-connection-name.1fa229cd-bf3f-47f0-8c49-afb36723997e",
    {
      privateLinkServiceConnectionState: {
        description: "Approved by johndoe@contoso.com",
        status: "Approved",
      },
    },
  );
  console.log(result);
}

async function main() {
  await approveOrRejectAPrivateEndpointConnection();
}

main().catch(console.error);
