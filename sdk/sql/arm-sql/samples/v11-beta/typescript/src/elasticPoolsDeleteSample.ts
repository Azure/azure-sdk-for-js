// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an elastic pool.
 *
 * @summary deletes an elastic pool.
 * x-ms-original-file: 2025-02-01-preview/ElasticPoolDelete.json
 */
async function deleteAnElasticPool(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  await client.elasticPools.delete("sqlcrudtest-3129", "sqlcrudtest-228", "sqlcrudtest-3851");
}

async function main(): Promise<void> {
  await deleteAnElasticPool();
}

main().catch(console.error);
