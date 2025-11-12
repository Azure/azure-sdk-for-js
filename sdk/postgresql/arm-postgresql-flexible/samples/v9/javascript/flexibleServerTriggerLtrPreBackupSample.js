// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to PreBackup operation performs all the checks that are needed for the subsequent long term retention backup operation to succeed.
 *
 * @summary PreBackup operation performs all the checks that are needed for the subsequent long term retention backup operation to succeed.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/preview/2025-01-01-preview/examples/LongTermRetentionPreBackup.json
 */

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

async function samplePrebackup() {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["POSTGRESQL_RESOURCE_GROUP"] || "rgLongTermRetention";
  const serverName = "pgsqlltrtestserver";
  const parameters = {
    backupSettings: { backupName: "backup1" },
  };
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.flexibleServer.triggerLtrPreBackup(
    resourceGroupName,
    serverName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await samplePrebackup();
}

main().catch(console.error);
