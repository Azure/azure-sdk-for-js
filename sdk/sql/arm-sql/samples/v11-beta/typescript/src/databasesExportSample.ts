// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to exports a database.
 *
 * @summary exports a database.
 * x-ms-original-file: 2025-02-01-preview/ExportDatabase.json
 */
async function exportsADatabase(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.databases.export("Default-SQL-SouthEastAsia", "testsvr", "testdb", {
    administratorLogin: "login",
    administratorLoginPassword: "password",
    authenticationType: "Sql",
    storageKey:
      "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx==",
    storageKeyType: "StorageAccessKey",
    storageUri: "https://test.blob.core.windows.net/test.bacpac",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to exports a database.
 *
 * @summary exports a database.
 * x-ms-original-file: 2025-02-01-preview/ExportDatabaseWithManagedIdentity.json
 */
async function exportsADatabaseUsingManagedIdentityToCommunicateWithSQLServerAndStorageAccount(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.databases.export("Default-SQL-SouthEastAsia", "testsvr", "testdb", {
    administratorLogin:
      "/subscriptions/00000000-1111-2222-3333-444444444444/resourcegroups/rgName/providers/Microsoft.ManagedIdentity/userAssignedIdentities/identityName",
    authenticationType: "ManagedIdentity",
    storageKey:
      "/subscriptions/00000000-1111-2222-3333-444444444444/resourcegroups/rgName/providers/Microsoft.ManagedIdentity/userAssignedIdentities/identityName",
    storageKeyType: "ManagedIdentity",
    storageUri: "https://test.blob.core.windows.net/test.bacpac",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to exports a database.
 *
 * @summary exports a database.
 * x-ms-original-file: 2025-02-01-preview/ExportDatabaseWithNetworkIsolation.json
 */
async function exportsADatabaseUsingPrivateLinkToCommunicateWithSQLServerAndStorageAccount(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.databases.export("Default-SQL-SouthEastAsia", "testsvr", "testdb", {
    administratorLogin: "login",
    administratorLoginPassword: "password",
    authenticationType: "Sql",
    networkIsolation: {
      sqlServerResourceId:
        "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/Default-SQL-SouthEastAsia/providers/Microsoft.Sql/servers/testsvr",
      storageAccountResourceId:
        "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/Default-SQL-SouthEastAsia/providers/Microsoft.Storage/storageAccounts/test-privatelink",
    },
    storageKey:
      "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx==",
    storageKeyType: "StorageAccessKey",
    storageUri: "https://test.blob.core.windows.net/test.bacpac",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await exportsADatabase();
  await exportsADatabaseUsingManagedIdentityToCommunicateWithSQLServerAndStorageAccount();
  await exportsADatabaseUsingPrivateLinkToCommunicateWithSQLServerAndStorageAccount();
}

main().catch(console.error);
