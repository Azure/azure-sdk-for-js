// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all private endpoint connections on a server.
 *
 * @summary gets all private endpoint connections on a server.
 * x-ms-original-file: 2025-02-01-preview/ManagedInstancePrivateEndpointConnectionList.json
 */
async function getsListOfPrivateEndpointConnectionsOnAServer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedInstancePrivateEndpointConnections.listByManagedInstance(
    "Default",
    "test-cl",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getsListOfPrivateEndpointConnectionsOnAServer();
}

main().catch(console.error);
