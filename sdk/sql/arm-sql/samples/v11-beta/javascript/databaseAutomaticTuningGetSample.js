// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets a database's automatic tuning.
 *
 * @summary Gets a database's automatic tuning.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2020-11-01-preview/examples/DatabaseAutomaticTuningGet.json
 */
async function getADatabaseAutomaticTuningSettings() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "c3aa9078-0000-0000-0000-e36f151182d7";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "default-sql-onebox";
  const serverName = "testsvr11";
  const databaseName = "db1";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databaseAutomaticTuningOperations.get(
    resourceGroupName,
    serverName,
    databaseName,
  );
  console.log(result);
}

async function main() {
  await getADatabaseAutomaticTuningSettings();
}

main().catch(console.error);
