// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataMigrationManagementClient } from "@azure/arm-datamigration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieve the registered Integration Runtime nodes and their monitoring data for a given Database Migration Service.
 *
 * @summary retrieve the registered Integration Runtime nodes and their monitoring data for a given Database Migration Service.
 * x-ms-original-file: 2025-09-01-preview/GetMonitorDataSqlMigrationService.json
 */
async function retrieveTheMonitoringData(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.sqlMigrationServices.listMonitoringData("testrg", "service1");
  console.log(result);
}

async function main(): Promise<void> {
  await retrieveTheMonitoringData();
}

main().catch(console.error);
