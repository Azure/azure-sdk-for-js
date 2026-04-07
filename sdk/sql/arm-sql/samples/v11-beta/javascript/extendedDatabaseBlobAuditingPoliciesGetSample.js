// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets an extended database's blob auditing policy.
 *
 * @summary gets an extended database's blob auditing policy.
 * x-ms-original-file: 2025-02-01-preview/ExtendedDatabaseBlobAuditingGet.json
 */
async function getAnExtendedDatabaseBlobAuditingPolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.extendedDatabaseBlobAuditingPolicies.get(
    "blobauditingtest-6852",
    "blobauditingtest-2080",
    "testdb",
    "default",
  );
  console.log(result);
}

async function main() {
  await getAnExtendedDatabaseBlobAuditingPolicy();
}

main().catch(console.error);
