// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the current ledger digest upload configuration for a database.
 *
 * @summary gets the current ledger digest upload configuration for a database.
 * x-ms-original-file: 2025-02-01-preview/LedgerDigestUploadsGet.json
 */
async function getsTheCurrentLedgerDigestUploadConfigurationForADatabase(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.ledgerDigestUploads.get(
    "ledgertestrg",
    "ledgertestserver",
    "testdb",
    "current",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getsTheCurrentLedgerDigestUploadConfigurationForADatabase();
}

main().catch(console.error);
