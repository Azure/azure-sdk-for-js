// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates an on demand backup of a server.
 *
 * @summary Creates an on demand backup of a server.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/BackupsAutomaticAndOnDemandCreate.json
 */
async function createAnOnDemandBackupOfAServer(): Promise<void> {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] ||
    "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName =
    process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const backupName = "ondemandbackup-20250601T183022";
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(
    credential,
    subscriptionId,
  );
  const result = await client.backupsAutomaticAndOnDemand.beginCreateAndWait(
    resourceGroupName,
    serverName,
    backupName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createAnOnDemandBackupOfAServer();
}

main().catch(console.error);
