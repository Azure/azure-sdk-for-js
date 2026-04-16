// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataMigrationManagementClient } from "@azure/arm-datamigration";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Delete Database Migration resource.
 *
 * @summary Delete Database Migration resource.
 * x-ms-original-file: specification/datamigration/resource-manager/Microsoft.DataMigration/stable/2025-06-30/examples/SqlMiDeleteDatabaseMigration.json
 */
async function deleteDatabaseMigrationResourceWithMinimumParameters(): Promise<void> {
  const subscriptionId =
    process.env["DATAMIGRATION_SUBSCRIPTION_ID"] ||
    "00000000-1111-2222-3333-444444444444";
  const resourceGroupName =
    process.env["DATAMIGRATION_RESOURCE_GROUP"] || "testrg";
  const managedInstanceName = "managedInstance1";
  const targetDbName = "db1";
  const credential = new DefaultAzureCredential();
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.databaseMigrationsSqlMi.beginDeleteAndWait(
    resourceGroupName,
    managedInstanceName,
    targetDbName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteDatabaseMigrationResourceWithMinimumParameters();
}

main().catch(console.error);
