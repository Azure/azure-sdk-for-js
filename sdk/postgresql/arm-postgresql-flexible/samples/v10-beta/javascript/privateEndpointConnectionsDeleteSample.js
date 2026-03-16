// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a private endpoint connection.
 *
 * @summary deletes a private endpoint connection.
 * x-ms-original-file: 2026-01-01-preview/PrivateEndpointConnectionsDelete.json
 */
async function deleteAPrivateEndpointConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  await client.privateEndpointConnections.delete(
    "exampleresourcegroup",
    "exampleserver",
    "private-endpoint-connection-name.1fa229cd-bf3f-47f0-8c49-afb36723997e",
  );
}

async function main() {
  await deleteAPrivateEndpointConnection();
}

main().catch(console.error);
