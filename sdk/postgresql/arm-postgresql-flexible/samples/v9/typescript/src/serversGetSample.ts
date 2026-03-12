// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets information about an existing server.
 *
 * @summary Gets information about an existing server.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/ServersGetWithVnet.json
 */
async function getInformationAboutAnExistingServerThatIsIntegratedIntoAVirtualNetworkProvidedByCustomer(): Promise<void> {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] ||
    "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName =
    process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(
    credential,
    subscriptionId,
  );
  const result = await client.servers.get(resourceGroupName, serverName);
  console.log(result);
}

/**
 * This sample demonstrates how to Gets information about an existing server.
 *
 * @summary Gets information about an existing server.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/ServersGetWithPrivateEndpoints.json
 */
async function getInformationAboutAnExistingServerThatIsnTIntegratedIntoAVirtualNetworkProvidedByCustomerAndHasPrivateEndpointConnections(): Promise<void> {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] ||
    "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName =
    process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(
    credential,
    subscriptionId,
  );
  const result = await client.servers.get(resourceGroupName, serverName);
  console.log(result);
}

/**
 * This sample demonstrates how to Gets information about an existing server.
 *
 * @summary Gets information about an existing server.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/ServersGet.json
 */
async function getInformationAboutAnExistingServer(): Promise<void> {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] ||
    "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName =
    process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(
    credential,
    subscriptionId,
  );
  const result = await client.servers.get(resourceGroupName, serverName);
  console.log(result);
}

async function main(): Promise<void> {
  await getInformationAboutAnExistingServerThatIsIntegratedIntoAVirtualNetworkProvidedByCustomer();
  await getInformationAboutAnExistingServerThatIsnTIntegratedIntoAVirtualNetworkProvidedByCustomerAndHasPrivateEndpointConnections();
  await getInformationAboutAnExistingServer();
}

main().catch(console.error);
