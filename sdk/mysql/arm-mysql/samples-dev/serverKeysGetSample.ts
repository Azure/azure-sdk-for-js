// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets a MySQL Server key.
 *
 * @summary Gets a MySQL Server key.
 * x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/stable/2020-01-01/examples/ServerKeyGet.json
 */

import { MySQLManagementClient } from "@azure/arm-mysql";
import { DefaultAzureCredential } from "@azure/identity";

async function getTheMySqlServerKey(): Promise<void> {
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = "testrg";
  const serverName = "testserver";
  const keyName = "someVault_someKey_01234567890123456789012345678901";
  const credential = new DefaultAzureCredential();
  const client = new MySQLManagementClient(credential, subscriptionId);
  const result = await client.serverKeys.get(resourceGroupName, serverName, keyName);
  console.log(result);
}

getTheMySqlServerKey().catch(console.error);
