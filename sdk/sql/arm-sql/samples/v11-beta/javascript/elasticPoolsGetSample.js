// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets an elastic pool.
 *
 * @summary Gets an elastic pool.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2022-08-01-preview/examples/HyperscaleElasticPoolGet.json
 */
async function getAHyperscaleElasticPool() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "sqlcrudtest-2369";
  const serverName = "sqlcrudtest-8069";
  const elasticPoolName = "sqlcrudtest-8102";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.elasticPools.get(resourceGroupName, serverName, elasticPoolName);
  console.log(result);
}

/**
 * This sample demonstrates how to Gets an elastic pool.
 *
 * @summary Gets an elastic pool.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2022-08-01-preview/examples/ElasticPoolGet.json
 */
async function getAnElasticPool() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "sqlcrudtest-2369";
  const serverName = "sqlcrudtest-8069";
  const elasticPoolName = "sqlcrudtest-8102";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.elasticPools.get(resourceGroupName, serverName, elasticPoolName);
  console.log(result);
}

/**
 * This sample demonstrates how to Gets an elastic pool.
 *
 * @summary Gets an elastic pool.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2022-08-01-preview/examples/GetElasticPoolWithAvailabilityZone.json
 */
async function getAnElasticPoolWithAvailabilityZone() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "sqlcrudtest-2369";
  const serverName = "sqlcrudtest-8069";
  const elasticPoolName = "sqlcrudtest-8102";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.elasticPools.get(resourceGroupName, serverName, elasticPoolName);
  console.log(result);
}

/**
 * This sample demonstrates how to Gets an elastic pool.
 *
 * @summary Gets an elastic pool.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2022-08-01-preview/examples/ElasticPoolGetWithPreferredEnclaveType.json
 */
async function getAnElasticPoolWithPreferredEnclaveTypeParameter() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "sqlcrudtest-2369";
  const serverName = "sqlcrudtest-8069";
  const elasticPoolName = "sqlcrudtest-8102";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.elasticPools.get(resourceGroupName, serverName, elasticPoolName);
  console.log(result);
}

async function main() {
  await getAHyperscaleElasticPool();
  await getAnElasticPool();
  await getAnElasticPoolWithAvailabilityZone();
  await getAnElasticPoolWithPreferredEnclaveTypeParameter();
}

main().catch(console.error);
