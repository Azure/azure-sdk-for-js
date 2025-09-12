// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Approve or reject a private endpoint connection with a given name.
 *
 * @summary Approve or reject a private endpoint connection with a given name.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2020-11-01-preview/examples/ManagedInstancePrivateEndpointConnectionUpdate.json
 */
async function approveOrRejectAPrivateEndpointConnectionWithAGivenName() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default";
  const managedInstanceName = "test-cl";
  const privateEndpointConnectionName = "private-endpoint-connection-name";
  const parameters = {
    privateLinkServiceConnectionState: {
      description: "Approved by johndoe@contoso.com",
      status: "Approved",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.managedInstancePrivateEndpointConnections.beginCreateOrUpdateAndWait(
    resourceGroupName,
    managedInstanceName,
    privateEndpointConnectionName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await approveOrRejectAPrivateEndpointConnectionWithAGivenName();
}

main().catch(console.error);
