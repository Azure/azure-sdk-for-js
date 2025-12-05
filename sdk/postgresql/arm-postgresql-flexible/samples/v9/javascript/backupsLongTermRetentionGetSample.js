// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets the results of a long retention backup operation for a server.
 *
 * @summary Gets the results of a long retention backup operation for a server.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/BackupsLongTermRetentionGet.json
 */
async function getTheResultsOfALongRetentionBackupOperationForAServer() {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const backupName = "exampleltrbackup";
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.backupsLongTermRetention.get(
    resourceGroupName,
    serverName,
    backupName,
  );
  console.log(result);
}

async function main() {
  await getTheResultsOfALongRetentionBackupOperationForAServer();
}

main().catch(console.error);
