// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets information of an on demand backup, given its name.
 *
 * @summary Gets information of an on demand backup, given its name.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/BackupsAutomaticAndOnDemandGet.json
 */
async function getAnOnDemandBackupGivenItsName(): Promise<void> {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] ||
    "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName =
    process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const backupName = "backup_638830782181266873";
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(
    credential,
    subscriptionId,
  );
  const result = await client.backupsAutomaticAndOnDemand.get(
    resourceGroupName,
    serverName,
    backupName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAnOnDemandBackupGivenItsName();
}

main().catch(console.error);
