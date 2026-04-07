// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to cancels the asynchronous operation on the elastic pool.
 *
 * @summary cancels the asynchronous operation on the elastic pool.
 * x-ms-original-file: 2025-02-01-preview/CancelElasticPoolOperation.json
 */
async function cancelTheElasticPoolManagementOperation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  await client.elasticPoolOperations.cancel(
    "sqlcrudtest-7398",
    "sqlcrudtest-6661",
    "testpool",
    "f779414b-e748-4925-8cfe-c8598f7660ae",
  );
}

async function main(): Promise<void> {
  await cancelTheElasticPoolManagementOperation();
}

main().catch(console.error);
