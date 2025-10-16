// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataMigrationManagementClient } = require("@azure/arm-datamigration");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Create or Update Database Migration Service.
 *
 * @summary Create or Update Database Migration Service.
 * x-ms-original-file: specification/datamigration/resource-manager/Microsoft.DataMigration/stable/2025-06-30/examples/CreateOrUpdateSqlMigrationServiceMAX.json
 */
async function createOrUpdateSqlMigrationServiceWithMaximumParameters() {
  const subscriptionId =
    process.env["DATAMIGRATION_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["DATAMIGRATION_RESOURCE_GROUP"] || "testrg";
  const sqlMigrationServiceName = "testagent";
  const parameters = { location: "northeurope" };
  const credential = new DefaultAzureCredential();
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.sqlMigrationServices.beginCreateOrUpdateAndWait(
    resourceGroupName,
    sqlMigrationServiceName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Create or Update Database Migration Service.
 *
 * @summary Create or Update Database Migration Service.
 * x-ms-original-file: specification/datamigration/resource-manager/Microsoft.DataMigration/stable/2025-06-30/examples/CreateOrUpdateSqlMigrationServiceMIN.json
 */
async function createOrUpdateSqlMigrationServiceWithMinimumParameters() {
  const subscriptionId =
    process.env["DATAMIGRATION_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["DATAMIGRATION_RESOURCE_GROUP"] || "testrg";
  const sqlMigrationServiceName = "testagent";
  const parameters = { location: "northeurope" };
  const credential = new DefaultAzureCredential();
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.sqlMigrationServices.beginCreateOrUpdateAndWait(
    resourceGroupName,
    sqlMigrationServiceName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await createOrUpdateSqlMigrationServiceWithMaximumParameters();
  await createOrUpdateSqlMigrationServiceWithMinimumParameters();
}

main().catch(console.error);
