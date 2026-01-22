// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets information about an existing server.
 *
 * @summary gets information about an existing server.
 * x-ms-original-file: 2026-01-01-preview/ServersGet.json
 */
async function getInformationAboutAnExistingServer(): Promise<void> {
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
async function getInformationAboutAnExistingServerThatIsnTIntegratedIntoAVirtualNetworkProvidedByCustomerAndHasPrivateEndpointConnections(): Promise<void> {
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
async function getInformationAboutAnExistingServerThatIsIntegratedIntoAVirtualNetworkProvidedByCustomer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.servers.get("exampleresourcegroup", "exampleserver");
  console.log(result);
}

async function main(): Promise<void> {
  await getInformationAboutAnExistingServer();
  await getInformationAboutAnExistingServerThatIsnTIntegratedIntoAVirtualNetworkProvidedByCustomerAndHasPrivateEndpointConnections();
  await getInformationAboutAnExistingServerThatIsIntegratedIntoAVirtualNetworkProvidedByCustomer();
}

main().catch(console.error);
