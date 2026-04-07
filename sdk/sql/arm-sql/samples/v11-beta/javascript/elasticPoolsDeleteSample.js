// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an elastic pool.
 *
 * @summary deletes an elastic pool.
 * x-ms-original-file: 2025-02-01-preview/ElasticPoolDelete.json
 */
async function deleteAnElasticPool() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  await client.elasticPools.delete("sqlcrudtest-3129", "sqlcrudtest-228", "sqlcrudtest-3851");
}

async function main() {
  await deleteAnElasticPool();
}

main().catch(console.error);
