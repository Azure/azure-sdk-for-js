// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Update a list of configurations in a given server.
 *
 * @summary Update a list of configurations in a given server.
 * x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/Configurations/preview/2023-06-01-preview/examples/ConfigurationsBatchUpdate.json
 */

import type { ConfigurationListForBatchUpdate } from "@azure/arm-mysql-flexible";
import { MySQLManagementFlexibleServerClient } from "@azure/arm-mysql-flexible";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function configurationList(): Promise<void> {
  const subscriptionId =
    process.env["MYSQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["MYSQL_RESOURCE_GROUP"] || "testrg";
  const serverName = "mysqltestserver";
  const parameters: ConfigurationListForBatchUpdate = {
    resetAllToDefault: "False",
    value: [
      { name: "event_scheduler", value: "OFF" },
      { name: "div_precision_increment", value: "8" },
    ],
  };
  const credential = new DefaultAzureCredential();
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.configurations.beginBatchUpdateAndWait(
    resourceGroupName,
    serverName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await configurationList();
}

main().catch(console.error);
