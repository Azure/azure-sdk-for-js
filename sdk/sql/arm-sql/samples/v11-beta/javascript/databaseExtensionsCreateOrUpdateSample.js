// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to perform a database extension operation, like database import, database export, or polybase import
 *
 * @summary perform a database extension operation, like database import, database export, or polybase import
 * x-ms-original-file: 2025-02-01-preview/CreateOrUpdateDatabaseExtensions.json
 */
async function createOrUpdateDatabaseExtensions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "a1c0814d-3c18-4e1e-a247-c128c12b1677";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databaseExtensions.createOrUpdate(
    "rg_20cbe0f0-c2d9-4522-9177-5469aad53029",
    "srv_1ffd1cf8-9951-47fb-807d-a9c384763849",
    "878e303f-1ea0-4f17-aa3d-a22ac5e9da08",
    "polybaseimport",
    {
      operationMode: "PolybaseImport",
      storageKey:
        "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      storageKeyType: "StorageAccessKey",
      storageUri: "https://teststorage.blob.core.windows.net/testcontainer/Manifest.xml",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to perform a database extension operation, like database import, database export, or polybase import
 *
 * @summary perform a database extension operation, like database import, database export, or polybase import
 * x-ms-original-file: 2025-02-01-preview/ExportDatabaseUsingDatabaseExtensions.json
 */
async function exportDatabaseUsingDatabaseExtension() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ca8cd24-0b47-4ad5-bc7e-d70e35c44adf";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databaseExtensions.createOrUpdate(
    "rg_d1ef9eae-044d-4710-ba59-b82e84ad3157",
    "srv_9243d320-ac4e-4f97-8e06-b1167dae5f4c",
    "db_7fe424c8-23cf-4ac3-bdc3-e21f424bdb68",
    "Export",
    {
      administratorLogin: "login",
      administratorLoginPassword: "password",
      authenticationType: "Sql",
      operationMode: "Export",
      storageKey:
        "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      storageKeyType: "StorageAccessKey",
      storageUri: "https://teststorage.blob.core.windows.net/testcontainer/Manifest.xml",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to perform a database extension operation, like database import, database export, or polybase import
 *
 * @summary perform a database extension operation, like database import, database export, or polybase import
 * x-ms-original-file: 2025-02-01-preview/ExportDatabaseUsingDatabaseExtensionsWithManagedIdentity.json
 */
async function exportDatabaseUsingDatabaseExtensionWithManagedIdentity() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ca8cd24-0b47-4ad5-bc7e-d70e35c44adf";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databaseExtensions.createOrUpdate(
    "rg_d1ef9eae-044d-4710-ba59-b82e84ad3157",
    "srv_9243d320-ac4e-4f97-8e06-b1167dae5f4c",
    "db_7fe424c8-23cf-4ac3-bdc3-e21f424bdb68",
    "Export",
    {
      administratorLogin:
        "/subscriptions/00000000-1111-2222-3333-444444444444/resourcegroups/rgName/providers/Microsoft.ManagedIdentity/userAssignedIdentities/identityName",
      authenticationType: "ManagedIdentity",
      operationMode: "Export",
      storageKey:
        "/subscriptions/00000000-1111-2222-3333-444444444444/resourcegroups/rgName/providers/Microsoft.ManagedIdentity/userAssignedIdentities/identityName",
      storageKeyType: "ManagedIdentity",
      storageUri: "https://teststorage.blob.core.windows.net/testcontainer/Manifest.xml",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to perform a database extension operation, like database import, database export, or polybase import
 *
 * @summary perform a database extension operation, like database import, database export, or polybase import
 * x-ms-original-file: 2025-02-01-preview/ImportDatabaseUsingDatabaseExtensions.json
 */
async function importDatabaseUsingDatabaseExtension() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "17ca4d13-bf7d-4c33-a60e-b87a2820a325";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databaseExtensions.createOrUpdate(
    "rg_062866bf-c4f4-41f9-abf0-b59132ca7924",
    "srv_2d6be2d2-26c8-4930-8fb6-82a5e95e0e82",
    "db_2a47e946-e414-4c00-94ac-ed886bb78302",
    "Import",
    {
      administratorLogin: "login",
      administratorLoginPassword: "password",
      authenticationType: "Sql",
      operationMode: "Import",
      storageKey:
        "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      storageKeyType: "StorageAccessKey",
      storageUri: "https://teststorage.blob.core.windows.net/testcontainer/Manifest.xml",
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateDatabaseExtensions();
  await exportDatabaseUsingDatabaseExtension();
  await exportDatabaseUsingDatabaseExtensionWithManagedIdentity();
  await importDatabaseUsingDatabaseExtension();
}

main().catch(console.error);
