// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MySQLManagementClient } from "@azure/arm-mysql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Deletes a server.
 *
 * @summary Deletes a server.
 * x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/stable/2017-12-01/examples/ServerDelete.json
 */
async function serverDelete(): Promise<void> {
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = "TestGroup";
  const serverName = "testserver";
  const credential = new DefaultAzureCredential();
  const client = new MySQLManagementClient(credential, subscriptionId);
  const result = await client.servers.beginDeleteAndWait(resourceGroupName, serverName);
  console.log(result);
}

serverDelete().catch(console.error);
