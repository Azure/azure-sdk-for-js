// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Imports a bacpac into a new database.
 *
 * @summary Imports a bacpac into a new database.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2024-11-01-preview/examples/ImportNewDatabaseWithManagedIdentity.json
 */
async function importsToANewDatabaseUsingManagedIdentityForTheSqlServerAndStorageAccount() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default-SQL-SouthEastAsia";
  const serverName = "testsvr";
  const parameters = {
    administratorLogin:
      "/subscriptions/00000000-1111-2222-3333-444444444444/resourcegroups/rgName/providers/Microsoft.ManagedIdentity/userAssignedIdentities/identityName",
    authenticationType: "ManagedIdentity",
    databaseName: "testdb",
    storageKey:
      "/subscriptions/00000000-1111-2222-3333-444444444444/resourcegroups/rgName/providers/Microsoft.ManagedIdentity/userAssignedIdentities/identityName",
    storageKeyType: "ManagedIdentity",
    storageUri: "https://test.blob.core.windows.net/test.bacpac",
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.servers.beginImportDatabaseAndWait(
    resourceGroupName,
    serverName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Imports a bacpac into a new database.
 *
 * @summary Imports a bacpac into a new database.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2024-11-01-preview/examples/ImportNewDatabaseWithNetworkIsolation.json
 */
async function importsToANewDatabaseUsingPrivateLinkForTheSqlServerAndStorageAccount() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default-SQL-SouthEastAsia";
  const serverName = "testsvr";
  const parameters = {
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
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.servers.beginImportDatabaseAndWait(
    resourceGroupName,
    serverName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Imports a bacpac into a new database.
 *
 * @summary Imports a bacpac into a new database.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2024-11-01-preview/examples/ImportNewDatabase.json
 */
async function importsToANewDatabase() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default-SQL-SouthEastAsia";
  const serverName = "testsvr";
  const parameters = {
    administratorLogin: "login",
    administratorLoginPassword: "password",
    authenticationType: "Sql",
    databaseName: "testdb",
    storageKey:
      "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx==",
    storageKeyType: "StorageAccessKey",
    storageUri: "https://test.blob.core.windows.net/test.bacpac",
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.servers.beginImportDatabaseAndWait(
    resourceGroupName,
    serverName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await importsToANewDatabaseUsingManagedIdentityForTheSqlServerAndStorageAccount();
  await importsToANewDatabaseUsingPrivateLinkForTheSqlServerAndStorageAccount();
  await importsToANewDatabase();
}

main().catch(console.error);
