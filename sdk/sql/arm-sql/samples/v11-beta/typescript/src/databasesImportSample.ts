// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to imports a bacpac into a new database.
 *
 * @summary imports a bacpac into a new database.
 * x-ms-original-file: 2025-02-01-preview/ImportDatabase.json
 */
async function importsToAnExistingEmptyDatabase(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databases.import("Default-SQL-SouthEastAsia", "testsvr", "testdb", {
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
 * This sample demonstrates how to imports a bacpac into a new database.
 *
 * @summary imports a bacpac into a new database.
 * x-ms-original-file: 2025-02-01-preview/ImportDatabaseWithManagedIdentity.json
 */
async function importsToAnExistingEmptyDatabaseUsingManagedIdentityToCommunicateWithSQLServerAndStorageAccount(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databases.import("Default-SQL-SouthEastAsia", "testsvr", "testdb", {
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
 * This sample demonstrates how to imports a bacpac into a new database.
 *
 * @summary imports a bacpac into a new database.
 * x-ms-original-file: 2025-02-01-preview/ImportDatabaseWithNetworkIsolation.json
 */
async function importsToAnExistingEmptyDatabaseUsingPrivateLinkToCommunicateWithSQLServerAndStorageAccount(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databases.import("Default-SQL-SouthEastAsia", "testsvr", "testdb", {
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
  await importsToAnExistingEmptyDatabase();
  await importsToAnExistingEmptyDatabaseUsingManagedIdentityToCommunicateWithSQLServerAndStorageAccount();
  await importsToAnExistingEmptyDatabaseUsingPrivateLinkToCommunicateWithSQLServerAndStorageAccount();
}

main().catch(console.error);
