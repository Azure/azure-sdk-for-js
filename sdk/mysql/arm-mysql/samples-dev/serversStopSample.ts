// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MySQLManagementClient } from "@azure/arm-mysql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Stops a running server.
 *
 * @summary Stops a running server.
 * x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/stable/2020-01-01/examples/ServerStop.json
 */
async function serverStop(): Promise<void> {
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = "TestGroup";
  const serverName = "testserver";
  const credential = new DefaultAzureCredential();
  const client = new MySQLManagementClient(credential, subscriptionId);
  const result = await client.servers.beginStopAndWait(resourceGroupName, serverName);
  console.log(result);
}

serverStop().catch(console.error);
