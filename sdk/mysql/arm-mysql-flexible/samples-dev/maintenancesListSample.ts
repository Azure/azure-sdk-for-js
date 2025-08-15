// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MySQLManagementFlexibleServerClient } from "@azure/arm-mysql-flexible";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to List maintenances.
 *
 * @summary List maintenances.
 * x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/Maintenance/preview/2023-10-01-preview/examples/MaintenancesListByServer.json
 */
async function listMaintenancesOnAServer(): Promise<void> {
  const subscriptionId =
    process.env["MYSQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["MYSQL_RESOURCE_GROUP"] || "TestGroup";
  const serverName = "testserver";
  const credential = new DefaultAzureCredential();
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.maintenances.list(resourceGroupName, serverName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listMaintenancesOnAServer();
}

main().catch(console.error);
