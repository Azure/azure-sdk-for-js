// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Failovers an elastic pool.
 *
 * @summary Failovers an elastic pool.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2022-08-01-preview/examples/FailoverElasticPool.json
 */
async function failoverAnElasticPool() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "group1";
  const serverName = "testServer";
  const elasticPoolName = "testElasticPool";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.elasticPools.beginFailoverAndWait(
    resourceGroupName,
    serverName,
    elasticPoolName,
  );
  console.log(result);
}

async function main() {
  await failoverAnElasticPool();
}

main().catch(console.error);
