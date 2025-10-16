// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets a list of recoverable databases.
 *
 * @summary Gets a list of recoverable databases.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2022-08-01-preview/examples/RecoverableDatabaseList.json
 */
async function getListOfRecoverableDatabases() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "recoverabledatabasetest-1234";
  const serverName = "recoverabledatabasetest-7177";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.recoverableDatabases.listByServer(
    resourceGroupName,
    serverName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await getListOfRecoverableDatabases();
}

main().catch(console.error);
