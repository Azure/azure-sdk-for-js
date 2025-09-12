// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets a private endpoint connection.
 *
 * @summary Gets a private endpoint connection.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2020-11-01-preview/examples/ManagedInstancePrivateEndpointConnectionGet.json
 */
async function getsPrivateEndpointConnection() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default";
  const managedInstanceName = "test-cl";
  const privateEndpointConnectionName = "private-endpoint-connection-name";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.managedInstancePrivateEndpointConnections.get(
    resourceGroupName,
    managedInstanceName,
    privateEndpointConnectionName,
  );
  console.log(result);
}

async function main() {
  await getsPrivateEndpointConnection();
}

main().catch(console.error);
