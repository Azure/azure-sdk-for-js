// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a private endpoint connection.
 *
 * @summary gets a private endpoint connection.
 * x-ms-original-file: 2026-01-01-preview/PrivateEndpointConnectionsGet.json
 */
async function getAPrivateEndpointConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.get(
    "exampleresourcegroup",
    "exampleserver",
    "private-endpoint-connection-name.1fa229cd-bf3f-47f0-8c49-afb36723997e",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAPrivateEndpointConnection();
}

main().catch(console.error);
