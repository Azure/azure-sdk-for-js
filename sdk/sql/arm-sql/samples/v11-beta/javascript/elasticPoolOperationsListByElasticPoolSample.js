// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets a list of operations performed on the elastic pool.
 *
 * @summary Gets a list of operations performed on the elastic pool.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2020-11-01-preview/examples/ListElasticPoolOperations.json
 */
async function listTheElasticPoolManagementOperations() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "sqlcrudtestgroup";
  const serverName = "sqlcrudtestserver";
  const elasticPoolName = "testpool";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.elasticPoolOperations.listByElasticPool(
    resourceGroupName,
    serverName,
    elasticPoolName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listTheElasticPoolManagementOperations();
}

main().catch(console.error);
