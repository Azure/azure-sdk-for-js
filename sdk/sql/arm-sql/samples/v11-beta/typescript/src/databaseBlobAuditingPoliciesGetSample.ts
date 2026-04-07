// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a database's blob auditing policy.
 *
 * @summary gets a database's blob auditing policy.
 * x-ms-original-file: 2025-02-01-preview/DatabaseBlobAuditingGet.json
 */
async function getADatabaseBlobAuditingPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.databaseBlobAuditingPolicies.get(
    "blobauditingtest-6852",
    "blobauditingtest-2080",
    "testdb",
    "default",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getADatabaseBlobAuditingPolicy();
}

main().catch(console.error);
