// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to List all the AAD administrators in a given server.
 *
 * @summary List all the AAD administrators in a given server.
 * x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/AAD/preview/2023-06-01-preview/examples/AzureADAdministratorsListByServer.json
 */

const { MySQLManagementFlexibleServerClient } = require("@azure/arm-mysql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

async function listAzureAdAdministratorsInAServer() {
  const subscriptionId =
    process.env["MYSQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["MYSQL_RESOURCE_GROUP"] || "testrg";
  const serverName = "mysqltestsvc4";
  const credential = new DefaultAzureCredential();
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.azureADAdministrators.listByServer(
    resourceGroupName,
    serverName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listAzureAdAdministratorsInAServer();
}

main().catch(console.error);
