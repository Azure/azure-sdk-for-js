// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Deletes an elastic pool.
 *
 * @summary Deletes an elastic pool.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2022-08-01-preview/examples/ElasticPoolDelete.json
 */
async function deleteAnElasticPool() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "sqlcrudtest-3129";
  const serverName = "sqlcrudtest-228";
  const elasticPoolName = "sqlcrudtest-3851";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.elasticPools.beginDeleteAndWait(
    resourceGroupName,
    serverName,
    elasticPoolName,
  );
  console.log(result);
}

async function main() {
  await deleteAnElasticPool();
}

main().catch(console.error);
