// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MySQLManagementFlexibleServerClient } from "@azure/arm-mysql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a private endpoint connection.
 *
 * @summary gets a private endpoint connection.
 * x-ms-original-file: 2024-12-30/PrivateEndpointConnectionGet.json
 */
async function getsPrivateEndpointConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.get(
    "Default",
    "test-svr",
    "private-endpoint-connection-name",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getsPrivateEndpointConnection();
}

main().catch(console.error);
