// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Start the Long Term Retention Backup operation
 *
 * @summary Start the Long Term Retention Backup operation
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/preview/2025-01-01-preview/examples/LongTermRetentionBackup.json
 */

import {
  LtrBackupRequest,
  PostgreSQLManagementFlexibleServerClient,
} from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function sampleExecuteBackup(): Promise<void> {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["POSTGRESQL_RESOURCE_GROUP"] || "rgLongTermRetention";
  const serverName = "pgsqlltrtestserver";
  const parameters: LtrBackupRequest = {
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

async function main(): Promise<void> {
  await sampleExecuteBackup();
}

main().catch(console.error);
