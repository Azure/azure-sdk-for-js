// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Lists all available backups of a server.
 *
 * @summary Lists all available backups of a server.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/BackupsAutomaticAndOnDemandListByServer.json
 */
async function listAllAvailableBackupsOfAServer(): Promise<void> {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] ||
    "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName =
    process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(
    credential,
    subscriptionId,
  );
  const resArray = new Array();
  for await (const item of client.backupsAutomaticAndOnDemand.listByServer(
    resourceGroupName,
    serverName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listAllAvailableBackupsOfAServer();
}

main().catch(console.error);
