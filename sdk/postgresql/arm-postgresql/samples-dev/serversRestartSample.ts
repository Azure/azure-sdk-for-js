// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Restarts a server.
 *
 * @summary Restarts a server.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2017-12-01/examples/ServerRestart.json
 */

import { PostgreSQLManagementClient } from "@azure/arm-postgresql";
import { DefaultAzureCredential } from "@azure/identity";

async function serverRestart(): Promise<void> {
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = "TestGroup";
  const serverName = "testserver";
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementClient(credential, subscriptionId);
  const result = await client.servers.beginRestartAndWait(resourceGroupName, serverName);
  console.log(result);
}

serverRestart().catch(console.error);
