// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  DatabaseMigrationsSqlMiGetOptionalParams,
  DataMigrationManagementClient,
} from "@azure/arm-datamigration";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Retrieve the specified database migration for a given SQL Managed Instance.
 *
 * @summary Retrieve the specified database migration for a given SQL Managed Instance.
 * x-ms-original-file: specification/datamigration/resource-manager/Microsoft.DataMigration/stable/2025-06-30/examples/SqlMiGetDatabaseMigrationExpanded.json
 */
async function getSqlMiDatabaseMigrationWithTheExpandParameter(): Promise<void> {
  const subscriptionId =
    process.env["DATAMIGRATION_SUBSCRIPTION_ID"] ||
    "00000000-1111-2222-3333-444444444444";
  const resourceGroupName =
    process.env["DATAMIGRATION_RESOURCE_GROUP"] || "testrg";
  const managedInstanceName = "managedInstance1";
  const targetDbName = "db1";
  const expand = "MigrationStatusDetails";
  const options: DatabaseMigrationsSqlMiGetOptionalParams = { expand };
  const credential = new DefaultAzureCredential();
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.databaseMigrationsSqlMi.get(
    resourceGroupName,
    managedInstanceName,
    targetDbName,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Retrieve the specified database migration for a given SQL Managed Instance.
 *
 * @summary Retrieve the specified database migration for a given SQL Managed Instance.
 * x-ms-original-file: specification/datamigration/resource-manager/Microsoft.DataMigration/stable/2025-06-30/examples/SqlMiGetDatabaseMigration.json
 */
async function getSqlMiDatabaseMigrationWithoutTheExpandParameter(): Promise<void> {
  const subscriptionId =
    process.env["DATAMIGRATION_SUBSCRIPTION_ID"] ||
    "00000000-1111-2222-3333-444444444444";
  const resourceGroupName =
    process.env["DATAMIGRATION_RESOURCE_GROUP"] || "testrg";
  const managedInstanceName = "managedInstance1";
  const targetDbName = "db1";
  const credential = new DefaultAzureCredential();
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.databaseMigrationsSqlMi.get(
    resourceGroupName,
    managedInstanceName,
    targetDbName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getSqlMiDatabaseMigrationWithTheExpandParameter();
  await getSqlMiDatabaseMigrationWithoutTheExpandParameter();
}

main().catch(console.error);
