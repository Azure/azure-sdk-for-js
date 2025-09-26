// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataMigrationManagementClient } = require("@azure/arm-datamigration");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Retrieve the specified database migration for a given SQL VM.
 *
 * @summary Retrieve the specified database migration for a given SQL VM.
 * x-ms-original-file: specification/datamigration/resource-manager/Microsoft.DataMigration/stable/2025-06-30/examples/SqlVmGetDatabaseMigrationExpanded.json
 */
async function getSqlVMDatabaseMigrationWithTheExpandParameter() {
  const subscriptionId =
    process.env["DATAMIGRATION_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["DATAMIGRATION_RESOURCE_GROUP"] || "testrg";
  const sqlVirtualMachineName = "testvm";
  const targetDbName = "db1";
  const expand = "MigrationStatusDetails";
  const options = { expand };
  const credential = new DefaultAzureCredential();
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.databaseMigrationsSqlVm.get(
    resourceGroupName,
    sqlVirtualMachineName,
    targetDbName,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Retrieve the specified database migration for a given SQL VM.
 *
 * @summary Retrieve the specified database migration for a given SQL VM.
 * x-ms-original-file: specification/datamigration/resource-manager/Microsoft.DataMigration/stable/2025-06-30/examples/SqlVmGetDatabaseMigration.json
 */
async function getSqlVMDatabaseMigrationWithoutTheExpandParameter() {
  const subscriptionId =
    process.env["DATAMIGRATION_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["DATAMIGRATION_RESOURCE_GROUP"] || "testrg";
  const sqlVirtualMachineName = "testvm";
  const targetDbName = "db1";
  const credential = new DefaultAzureCredential();
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.databaseMigrationsSqlVm.get(
    resourceGroupName,
    sqlVirtualMachineName,
    targetDbName,
  );
  console.log(result);
}

async function main() {
  await getSqlVMDatabaseMigrationWithTheExpandParameter();
  await getSqlVMDatabaseMigrationWithoutTheExpandParameter();
}

main().catch(console.error);
