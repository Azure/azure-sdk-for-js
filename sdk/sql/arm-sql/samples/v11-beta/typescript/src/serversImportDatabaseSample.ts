// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to imports a bacpac into a new database.
 *
 * @summary imports a bacpac into a new database.
 * x-ms-original-file: 2025-02-01-preview/ImportNewDatabase.json
 */
async function importsToANewDatabase(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.servers.importDatabase("Default-SQL-SouthEastAsia", "testsvr", {
    administratorLogin: "login",
    administratorLoginPassword: "password",
    authenticationType: "Sql",
    databaseName: "testdb",
    storageKey:
      "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx==",
    storageKeyType: "StorageAccessKey",
    storageUri: "https://test.blob.core.windows.net/test.bacpac",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to imports a bacpac into a new database.
 *
 * @summary imports a bacpac into a new database.
 * x-ms-original-file: 2025-02-01-preview/ImportNewDatabaseWithManagedIdentity.json
 */
async function importsToANewDatabaseUsingManagedIdentityForTheSQLServerAndStorageAccount(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.servers.importDatabase("Default-SQL-SouthEastAsia", "testsvr", {
    administratorLogin:
      "/subscriptions/00000000-1111-2222-3333-444444444444/resourcegroups/rgName/providers/Microsoft.ManagedIdentity/userAssignedIdentities/identityName",
    authenticationType: "ManagedIdentity",
    databaseName: "testdb",
    storageKey:
      "/subscriptions/00000000-1111-2222-3333-444444444444/resourcegroups/rgName/providers/Microsoft.ManagedIdentity/userAssignedIdentities/identityName",
    storageKeyType: "ManagedIdentity",
    storageUri: "https://test.blob.core.windows.net/test.bacpac",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to imports a bacpac into a new database.
 *
 * @summary imports a bacpac into a new database.
 * x-ms-original-file: 2025-02-01-preview/ImportNewDatabaseWithNetworkIsolation.json
 */
async function importsToANewDatabaseUsingPrivateLinkForTheSQLServerAndStorageAccount(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.servers.importDatabase("Default-SQL-SouthEastAsia", "testsvr", {
    administratorLogin: "login",
    administratorLoginPassword: "password",
    authenticationType: "Sql",
    databaseName: "testdb",
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
  await importsToANewDatabase();
  await importsToANewDatabaseUsingManagedIdentityForTheSQLServerAndStorageAccount();
  await importsToANewDatabaseUsingPrivateLinkForTheSQLServerAndStorageAccount();
}

main().catch(console.error);
