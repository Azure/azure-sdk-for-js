// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes the PostgreSQL Server key with the given name.
 *
 * @summary Deletes the PostgreSQL Server key with the given name.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2020-01-01/examples/ServerKeyDelete.json
 */

import { PostgreSQLManagementClient } from "@azure/arm-postgresql";
import { DefaultAzureCredential } from "@azure/identity";

async function deleteThePostgreSqlServerKey(): Promise<void> {
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const serverName = "testserver";
  const keyName = "someVault_someKey_01234567890123456789012345678901";
  const resourceGroupName = "testrg";
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementClient(credential, subscriptionId);
  const result = await client.serverKeys.beginDeleteAndWait(serverName, keyName, resourceGroupName);
  console.log(result);
}

deleteThePostgreSqlServerKey().catch(console.error);
