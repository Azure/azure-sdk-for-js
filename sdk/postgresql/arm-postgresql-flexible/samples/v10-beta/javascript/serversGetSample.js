// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets information about an existing server.
 *
 * @summary gets information about an existing server.
 * x-ms-original-file: 2026-01-01-preview/ServersGet.json
 */
async function getInformationAboutAnExistingServer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.servers.get("exampleresourcegroup", "exampleserver");
  console.log(result);
}

/**
 * This sample demonstrates how to gets information about an existing server.
 *
 * @summary gets information about an existing server.
 * x-ms-original-file: 2026-01-01-preview/ServersGetWithPrivateEndpoints.json
 */
async function getInformationAboutAnExistingServerThatIsnTIntegratedIntoAVirtualNetworkProvidedByCustomerAndHasPrivateEndpointConnections() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.servers.get("exampleresourcegroup", "exampleserver");
  console.log(result);
}

/**
 * This sample demonstrates how to gets information about an existing server.
 *
 * @summary gets information about an existing server.
 * x-ms-original-file: 2026-01-01-preview/ServersGetWithVnet.json
 */
async function getInformationAboutAnExistingServerThatIsIntegratedIntoAVirtualNetworkProvidedByCustomer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.servers.get("exampleresourcegroup", "exampleserver");
  console.log(result);
}

async function main() {
  await getInformationAboutAnExistingServer();
  await getInformationAboutAnExistingServerThatIsnTIntegratedIntoAVirtualNetworkProvidedByCustomerAndHasPrivateEndpointConnections();
  await getInformationAboutAnExistingServerThatIsIntegratedIntoAVirtualNetworkProvidedByCustomer();
}

main().catch(console.error);
