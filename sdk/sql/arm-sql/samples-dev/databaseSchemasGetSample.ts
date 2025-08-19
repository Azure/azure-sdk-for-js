// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get database schema
 *
 * @summary Get database schema
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2020-11-01-preview/examples/DatabaseSchemaGet.json
 */

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getDatabaseSchema(): Promise<void> {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "myRG";
  const serverName = "serverName";
  const databaseName = "myDatabase";
  const schemaName = "dbo";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databaseSchemas.get(
    resourceGroupName,
    serverName,
    databaseName,
    schemaName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getDatabaseSchema();
}

main().catch(console.error);
