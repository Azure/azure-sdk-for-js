// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets all private endpoint connections on a server.
 *
 * @summary Gets all private endpoint connections on a server.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2022-08-01-preview/examples/PrivateEndpointConnectionList.json
 */
async function getsListOfPrivateEndpointConnectionsOnAServer() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default";
  const serverName = "test-svr";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateEndpointConnections.listByServer(
    resourceGroupName,
    serverName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await getsListOfPrivateEndpointConnectionsOnAServer();
}

main().catch(console.error);
