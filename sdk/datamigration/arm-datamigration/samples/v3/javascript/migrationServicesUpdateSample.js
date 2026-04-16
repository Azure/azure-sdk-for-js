// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataMigrationManagementClient } = require("@azure/arm-datamigration");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Update Database Migration Service.
 *
 * @summary Update Database Migration Service.
 * x-ms-original-file: specification/datamigration/resource-manager/Microsoft.DataMigration/stable/2025-06-30/examples/UpdateMigrationService.json
 */
async function updateMigrationService() {
  const subscriptionId =
    process.env["DATAMIGRATION_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["DATAMIGRATION_RESOURCE_GROUP"] || "testrg";
  const migrationServiceName = "testagent";
  const parameters = { tags: { mytag: "myval" } };
  const credential = new DefaultAzureCredential();
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.migrationServices.beginUpdateAndWait(
    resourceGroupName,
    migrationServiceName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await updateMigrationService();
}

main().catch(console.error);
