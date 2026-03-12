// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Returns elastic pool metric definitions.
 *
 * @summary Returns elastic pool metric definitions.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/stable/2014-04-01/examples/ElasticPoolMetricsDefinitionsList.json
 */
async function listDatabaseUsageMetrics() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "sqlcrudtest-6730";
  const serverName = "sqlcrudtest-9007";
  const elasticPoolName = "3481";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.elasticPools.listMetricDefinitions(
    resourceGroupName,
    serverName,
    elasticPoolName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listDatabaseUsageMetrics();
}

main().catch(console.error);
