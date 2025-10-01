// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  MigrationOperationInput,
  DataMigrationManagementClient,
} from "@azure/arm-datamigration";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Stop in-progress database migration to SQL Managed Instance.
 *
 * @summary Stop in-progress database migration to SQL Managed Instance.
 * x-ms-original-file: specification/datamigration/resource-manager/Microsoft.DataMigration/stable/2025-06-30/examples/SqlMiCancelDatabaseMigration.json
 */
async function stopOngoingMigrationForTheDatabase(): Promise<void> {
  const subscriptionId =
    process.env["DATAMIGRATION_SUBSCRIPTION_ID"] ||
    "00000000-1111-2222-3333-444444444444";
  const resourceGroupName =
    process.env["DATAMIGRATION_RESOURCE_GROUP"] || "testrg";
  const managedInstanceName = "managedInstance1";
  const targetDbName = "db1";
  const parameters: MigrationOperationInput = {
    migrationOperationId: "4124fe90-d1b6-4b50-b4d9-46d02381f59a",
  };
  const credential = new DefaultAzureCredential();
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.databaseMigrationsSqlMi.beginCancelAndWait(
    resourceGroupName,
    managedInstanceName,
    targetDbName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await stopOngoingMigrationForTheDatabase();
}

main().catch(console.error);
