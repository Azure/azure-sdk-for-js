// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataMigrationManagementClient } = require("@azure/arm-datamigration");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Update Database Migration Service.
 *
 * @summary Update Database Migration Service.
 * x-ms-original-file: specification/datamigration/resource-manager/Microsoft.DataMigration/stable/2025-06-30/examples/UpdateSqlMigrationService.json
 */
async function updateSqlMigrationService() {
  const subscriptionId =
    process.env["DATAMIGRATION_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["DATAMIGRATION_RESOURCE_GROUP"] || "testrg";
  const sqlMigrationServiceName = "testagent";
  const parameters = { tags: { mytag: "myval" } };
  const credential = new DefaultAzureCredential();
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.sqlMigrationServices.beginUpdateAndWait(
    resourceGroupName,
    sqlMigrationServiceName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await updateSqlMigrationService();
}

main().catch(console.error);
