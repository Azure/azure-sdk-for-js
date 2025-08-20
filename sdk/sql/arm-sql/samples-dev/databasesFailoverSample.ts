// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Failovers a database.
 *
 * @summary Failovers a database.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2023-02-01-preview/examples/FailoverDatabase.json
 */

import type { DatabasesFailoverOptionalParams } from "@azure/arm-sql";
import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function failoverAnDatabase(): Promise<void> {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "group1";
  const serverName = "testServer";
  const databaseName = "testDatabase";
  const replicaType = "Primary";
  const options: DatabasesFailoverOptionalParams = { replicaType };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databases.beginFailoverAndWait(
    resourceGroupName,
    serverName,
    databaseName,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await failoverAnDatabase();
}

main().catch(console.error);
