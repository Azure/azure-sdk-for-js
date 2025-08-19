// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets information about a configuration of server.
 *
 * @summary Gets information about a configuration of server.
 * x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/Configurations/preview/2023-06-01-preview/examples/ConfigurationGet.json
 */

import { MySQLManagementFlexibleServerClient } from "@azure/arm-mysql-flexible";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getAConfiguration(): Promise<void> {
  const subscriptionId =
    process.env["MYSQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["MYSQL_RESOURCE_GROUP"] || "TestGroup";
  const serverName = "testserver";
  const configurationName = "event_scheduler";
  const credential = new DefaultAzureCredential();
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.configurations.get(resourceGroupName, serverName, configurationName);
  console.log(result);
}

async function main(): Promise<void> {
  await getAConfiguration();
}

main().catch(console.error);
