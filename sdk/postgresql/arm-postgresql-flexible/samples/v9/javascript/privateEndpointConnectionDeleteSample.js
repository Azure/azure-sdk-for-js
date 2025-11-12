// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes a private endpoint connection with a given name.
 *
 * @summary Deletes a private endpoint connection with a given name.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/preview/2025-01-01-preview/examples/PrivateEndpointConnectionDelete.json
 */

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

async function deletesAPrivateEndpointConnectionWithAGivenName() {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["POSTGRESQL_RESOURCE_GROUP"] || "Default";
  const serverName = "test-svr";
  const privateEndpointConnectionName =
    "private-endpoint-connection-name.1fa229cd-bf3f-47f0-8c49-afb36723997e";
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.privateEndpointConnectionOperations.beginDeleteAndWait(
    resourceGroupName,
    serverName,
    privateEndpointConnectionName,
  );
  console.log(result);
}

async function main() {
  await deletesAPrivateEndpointConnectionWithAGivenName();
}

main().catch(console.error);
