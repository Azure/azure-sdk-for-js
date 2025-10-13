// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MySQLManagementFlexibleServerClient } = require("@azure/arm-mysql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all private endpoint connections on a server.
 *
 * @summary gets all private endpoint connections on a server.
 * x-ms-original-file: 2024-12-30/PrivateEndpointConnectionList.json
 */
async function getsListOfPrivateEndpointConnectionsOnAServer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.listByServer("Default", "test-svr");
  console.log(result);
}

async function main() {
  await getsListOfPrivateEndpointConnectionsOnAServer();
}

main().catch(console.error);
