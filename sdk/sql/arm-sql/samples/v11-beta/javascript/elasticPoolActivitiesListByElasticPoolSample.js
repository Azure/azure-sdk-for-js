// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Returns elastic pool activities.
 *
 * @summary Returns elastic pool activities.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/stable/2014-04-01-legacy/examples/ElasticPoolActivityList.json
 */
async function listElasticPoolActivity() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "sqlcrudtest-4291";
  const serverName = "sqlcrudtest-6574";
  const elasticPoolName = "8749";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.elasticPoolActivities.listByElasticPool(
    resourceGroupName,
    serverName,
    elasticPoolName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listElasticPoolActivity();
}

main().catch(console.error);
