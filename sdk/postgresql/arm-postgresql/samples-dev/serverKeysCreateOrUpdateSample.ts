// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates a PostgreSQL Server key.
 *
 * @summary Creates or updates a PostgreSQL Server key.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2020-01-01/examples/ServerKeyCreateOrUpdate.json
 */

import type { ServerKey } from "@azure/arm-postgresql";
import { PostgreSQLManagementClient } from "@azure/arm-postgresql";
import { DefaultAzureCredential } from "@azure/identity";

async function createsOrUpdatesAPostgreSqlServerKey(): Promise<void> {
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const serverName = "testserver";
  const keyName = "someVault_someKey_01234567890123456789012345678901";
  const resourceGroupName = "testrg";
  const parameters: ServerKey = {
    serverKeyType: "AzureKeyVault",
    uri: "https://someVault.vault.azure.net/keys/someKey/01234567890123456789012345678901",
  };
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementClient(credential, subscriptionId);
  const result = await client.serverKeys.beginCreateOrUpdateAndWait(
    serverName,
    keyName,
    resourceGroupName,
    parameters,
  );
  console.log(result);
}

createsOrUpdatesAPostgreSqlServerKey().catch(console.error);
