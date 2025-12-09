// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Approves or rejects a private endpoint connection.
 *
 * @summary Approves or rejects a private endpoint connection.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/PrivateEndpointConnectionsUpdate.json
 */
async function approveOrRejectAPrivateEndpointConnection() {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const privateEndpointConnectionName =
    "private-endpoint-connection-name.1fa229cd-bf3f-47f0-8c49-afb36723997e";
  const parameters = {
    privateLinkServiceConnectionState: {
      description: "Approved by johndoe@contoso.com",
      status: "Approved",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.beginUpdateAndWait(
    resourceGroupName,
    serverName,
    privateEndpointConnectionName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await approveOrRejectAPrivateEndpointConnection();
}

main().catch(console.error);
