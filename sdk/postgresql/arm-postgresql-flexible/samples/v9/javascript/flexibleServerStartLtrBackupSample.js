// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Start the Long Term Retention Backup operation
 *
 * @summary Start the Long Term Retention Backup operation
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/preview/2025-01-01-preview/examples/LongTermRetentionBackup.json
 */

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

async function sampleExecuteBackup() {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["POSTGRESQL_RESOURCE_GROUP"] || "rgLongTermRetention";
  const serverName = "pgsqlltrtestserver";
  const parameters = {
    backupSettings: { backupName: "backup1" },
    targetDetails: { sasUriList: ["sasuri"] },
  };
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.flexibleServer.beginStartLtrBackupAndWait(
    resourceGroupName,
    serverName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await sampleExecuteBackup();
}

main().catch(console.error);
