// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the current ledger digest upload configuration for a database.
 *
 * @summary gets the current ledger digest upload configuration for a database.
 * x-ms-original-file: 2025-02-01-preview/ManagedLedgerDigestUploadsGet.json
 */
async function getsTheCurrentLedgerDigestUploadConfigurationForADatabase() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.managedLedgerDigestUploads.get(
    "ledgertestrg",
    "ledgertestserver",
    "testdb",
    "current",
  );
  console.log(result);
}

async function main() {
  await getsTheCurrentLedgerDigestUploadConfigurationForADatabase();
}

main().catch(console.error);
