// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MySQLManagementClient } from "@azure/arm-mysql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Deletes a database.
 *
 * @summary Deletes a database.
 * x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/stable/2017-12-01/examples/DatabaseDelete.json
 */
async function databaseDelete(): Promise<void> {
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = "TestGroup";
  const serverName = "testserver";
  const databaseName = "db1";
  const credential = new DefaultAzureCredential();
  const client = new MySQLManagementClient(credential, subscriptionId);
  const result = await client.databases.beginDeleteAndWait(
    resourceGroupName,
    serverName,
    databaseName,
  );
  console.log(result);
}

databaseDelete().catch(console.error);
