// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to disables uploading ledger digests to an Azure Storage account or an Azure Confidential Ledger instance.
 *
 * @summary disables uploading ledger digests to an Azure Storage account or an Azure Confidential Ledger instance.
 * x-ms-original-file: 2025-02-01-preview/LedgerDigestUploadsDisable.json
 */
async function disablesUploadingLedgerDigestsForADatabase() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.ledgerDigestUploads.disable(
    "ledgertestrg",
    "ledgertestserver",
    "testdb",
    "current",
  );
  console.log(result);
}

async function main() {
  await disablesUploadingLedgerDigestsForADatabase();
}

main().catch(console.error);
