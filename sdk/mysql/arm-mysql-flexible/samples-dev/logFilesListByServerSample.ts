// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to List all the server log files in a given server.
 *
 * @summary List all the server log files in a given server.
 * x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/LogFiles/preview/2023-06-01-preview/examples/LogFilesListByServer.json
 */

import { MySQLManagementFlexibleServerClient } from "@azure/arm-mysql-flexible";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listAllServerLogFilesForAServer(): Promise<void> {
  const subscriptionId =
    process.env["MYSQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["MYSQL_RESOURCE_GROUP"] || "testrg";
  const serverName = "mysqltestsvc1";
  const credential = new DefaultAzureCredential();
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.logFiles.listByServer(resourceGroupName, serverName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listAllServerLogFilesForAServer();
}

main().catch(console.error);
