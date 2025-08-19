// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementClient } from "@azure/arm-postgresql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Gets a list of  Server keys.
 *
 * @summary Gets a list of  Server keys.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2020-01-01/examples/ServerKeyList.json
 */
async function listTheKeysForAPostgreSqlServer(): Promise<void> {
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = "testrg";
  const serverName = "testserver";
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.serverKeys.list(resourceGroupName, serverName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

listTheKeysForAPostgreSqlServer().catch(console.error);
