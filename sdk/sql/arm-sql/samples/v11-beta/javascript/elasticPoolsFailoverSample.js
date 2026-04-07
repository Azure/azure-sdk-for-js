// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to failovers an elastic pool.
 *
 * @summary failovers an elastic pool.
 * x-ms-original-file: 2025-02-01-preview/FailoverElasticPool.json
 */
async function failoverAnElasticPool() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  await client.elasticPools.failover("group1", "testServer", "testElasticPool");
}

async function main() {
  await failoverAnElasticPool();
}

main().catch(console.error);
