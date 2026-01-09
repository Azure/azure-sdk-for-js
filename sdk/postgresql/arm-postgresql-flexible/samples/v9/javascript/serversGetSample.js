// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets information about an existing server.
 *
 * @summary Gets information about an existing server.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/ServersGetWithVnet.json
 */
async function getInformationAboutAnExistingServerThatIsIntegratedIntoAVirtualNetworkProvidedByCustomer() {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.servers.get(resourceGroupName, serverName);
  console.log(result);
}

/**
 * This sample demonstrates how to Gets information about an existing server.
 *
 * @summary Gets information about an existing server.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/ServersGetWithPrivateEndpoints.json
 */
async function getInformationAboutAnExistingServerThatIsnTIntegratedIntoAVirtualNetworkProvidedByCustomerAndHasPrivateEndpointConnections() {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.servers.get(resourceGroupName, serverName);
  console.log(result);
}

/**
 * This sample demonstrates how to Gets information about an existing server.
 *
 * @summary Gets information about an existing server.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/ServersGet.json
 */
async function getInformationAboutAnExistingServer() {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.servers.get(resourceGroupName, serverName);
  console.log(result);
}

async function main() {
  await getInformationAboutAnExistingServerThatIsIntegratedIntoAVirtualNetworkProvidedByCustomer();
  await getInformationAboutAnExistingServerThatIsnTIntegratedIntoAVirtualNetworkProvidedByCustomerAndHasPrivateEndpointConnections();
  await getInformationAboutAnExistingServer();
}

main().catch(console.error);
