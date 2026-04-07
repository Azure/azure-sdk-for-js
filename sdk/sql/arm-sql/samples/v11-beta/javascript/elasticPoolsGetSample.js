// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets an elastic pool.
 *
 * @summary gets an elastic pool.
 * x-ms-original-file: 2025-02-01-preview/ElasticPoolGet.json
 */
async function getAnElasticPool() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.elasticPools.get(
    "sqlcrudtest-2369",
    "sqlcrudtest-8069",
    "sqlcrudtest-8102",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets an elastic pool.
 *
 * @summary gets an elastic pool.
 * x-ms-original-file: 2025-02-01-preview/ElasticPoolGetWithPreferredEnclaveType.json
 */
async function getAnElasticPoolWithPreferredEnclaveTypeParameter() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.elasticPools.get(
    "sqlcrudtest-2369",
    "sqlcrudtest-8069",
    "sqlcrudtest-8102",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets an elastic pool.
 *
 * @summary gets an elastic pool.
 * x-ms-original-file: 2025-02-01-preview/GetElasticPoolWithAvailabilityZone.json
 */
async function getAnElasticPoolWithAvailabilityZone() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.elasticPools.get(
    "sqlcrudtest-2369",
    "sqlcrudtest-8069",
    "sqlcrudtest-8102",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets an elastic pool.
 *
 * @summary gets an elastic pool.
 * x-ms-original-file: 2025-02-01-preview/GetElasticPoolWithServerlessProperties.json
 */
async function getAnElasticPoolWithServerlessProperties() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.elasticPools.get(
    "sqlcrudtest-2369",
    "sqlcrudtest-8069",
    "sqlcrudtest-8102",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets an elastic pool.
 *
 * @summary gets an elastic pool.
 * x-ms-original-file: 2025-02-01-preview/HyperscaleElasticPoolGet.json
 */
async function getAHyperscaleElasticPool() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.elasticPools.get(
    "sqlcrudtest-2369",
    "sqlcrudtest-8069",
    "sqlcrudtest-8102",
  );
  console.log(result);
}

async function main() {
  await getAnElasticPool();
  await getAnElasticPoolWithPreferredEnclaveTypeParameter();
  await getAnElasticPoolWithAvailabilityZone();
  await getAnElasticPoolWithServerlessProperties();
  await getAHyperscaleElasticPool();
}

main().catch(console.error);
