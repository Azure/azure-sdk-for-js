// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataMigrationManagementClient } from "@azure/arm-datamigration";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Retrieve the registered Integration Runtime nodes and their monitoring data for a given Database Migration Service.
 *
 * @summary Retrieve the registered Integration Runtime nodes and their monitoring data for a given Database Migration Service.
 * x-ms-original-file: specification/datamigration/resource-manager/Microsoft.DataMigration/stable/2025-06-30/examples/GetMonitorDataSqlMigrationService.json
 */
async function retrieveTheMonitoringData(): Promise<void> {
  const subscriptionId =
    process.env["DATAMIGRATION_SUBSCRIPTION_ID"] ||
    "00000000-1111-2222-3333-444444444444";
  const resourceGroupName =
    process.env["DATAMIGRATION_RESOURCE_GROUP"] || "testrg";
  const sqlMigrationServiceName = "service1";
  const credential = new DefaultAzureCredential();
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.sqlMigrationServices.listMonitoringData(
    resourceGroupName,
    sqlMigrationServiceName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await retrieveTheMonitoringData();
}

main().catch(console.error);
