// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  LtrPreBackupRequest} from "@azure/arm-postgresql-flexible";
import {
  PostgreSQLManagementFlexibleServerClient,
} from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Performs all checks required for a long term retention backup operation to succeed.
 *
 * @summary Performs all checks required for a long term retention backup operation to succeed.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/BackupsLongTermRetentionCheckPrerequisites.json
 */
async function performAllChecksRequiredForALongTermRetentionBackupOperationToSucceed(): Promise<void> {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] ||
    "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName =
    process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const parameters: LtrPreBackupRequest = {
    backupSettings: { backupName: "exampleltrbackup" },
  };
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(
    credential,
    subscriptionId,
  );
  const result = await client.backupsLongTermRetention.checkPrerequisites(
    resourceGroupName,
    serverName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await performAllChecksRequiredForALongTermRetentionBackupOperationToSucceed();
}

main().catch(console.error);
