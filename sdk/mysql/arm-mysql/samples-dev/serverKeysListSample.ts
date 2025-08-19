// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets a list of  Server keys.
 *
 * @summary Gets a list of  Server keys.
 * x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/stable/2020-01-01/examples/ServerKeyList.json
 */

import { MySQLManagementClient } from "@azure/arm-mysql";
import { DefaultAzureCredential } from "@azure/identity";

async function listTheKeysForAMySqlServer(): Promise<void> {
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = "testrg";
  const serverName = "testserver";
  const credential = new DefaultAzureCredential();
  const client = new MySQLManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.serverKeys.list(resourceGroupName, serverName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

listTheKeysForAMySqlServer().catch(console.error);
