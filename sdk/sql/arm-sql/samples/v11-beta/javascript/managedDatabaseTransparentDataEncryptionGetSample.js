// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets a managed database's transparent data encryption.
 *
 * @summary Gets a managed database's transparent data encryption.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2020-11-01-preview/examples/ManagedTransparentDataEncryptionGet.json
 */
async function getADatabaseTransparentDataEncryption() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "security-tde-resourcegroup";
  const managedInstanceName = "securitytde";
  const databaseName = "testdb";
  const tdeName = "current";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.managedDatabaseTransparentDataEncryption.get(
    resourceGroupName,
    managedInstanceName,
    databaseName,
    tdeName,
  );
  console.log(result);
}

async function main() {
  await getADatabaseTransparentDataEncryption();
}

main().catch(console.error);
