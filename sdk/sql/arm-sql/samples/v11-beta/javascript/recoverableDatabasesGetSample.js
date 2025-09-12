// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets a recoverable database.
 *
 * @summary Gets a recoverable database.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2022-08-01-preview/examples/RecoverableDatabaseGet.json
 */
async function getARecoverableDatabase() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "recoverabledatabasetest-6852";
  const serverName = "recoverabledatabasetest-2080";
  const databaseName = "recoverabledatabasetest-9187";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.recoverableDatabases.get(resourceGroupName, serverName, databaseName);
  console.log(result);
}

/**
 * This sample demonstrates how to Gets a recoverable database.
 *
 * @summary Gets a recoverable database.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2022-08-01-preview/examples/RecoverableDatabaseGetWithExpandEqualsKeys.json
 */
async function getsARecoverableDatabaseWithExpandEqualsKeys() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "recoverabledatabasetest-6852";
  const serverName = "recoverabledatabasetest-2080";
  const databaseName = "recoverabledatabasetest-9187";
  const expand = "keys";
  const options = { expand };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.recoverableDatabases.get(
    resourceGroupName,
    serverName,
    databaseName,
    options,
  );
  console.log(result);
}

async function main() {
  await getARecoverableDatabase();
  await getsARecoverableDatabaseWithExpandEqualsKeys();
}

main().catch(console.error);
