// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to enables upload ledger digests to an Azure Storage account or an Azure Confidential Ledger instance.
 *
 * @summary enables upload ledger digests to an Azure Storage account or an Azure Confidential Ledger instance.
 * x-ms-original-file: 2025-02-01-preview/LedgerDigestUploadsEnable.json
 */
async function enablesLedgerDigestUploadConfigurationForADatabase() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.ledgerDigestUploads.createOrUpdate(
    "ledgertestrg",
    "ledgertestserver",
    "testdb",
    "current",
    { digestStorageEndpoint: "https://MyAccount.blob.core.windows.net" },
  );
  console.log(result);
}

async function main() {
  await enablesLedgerDigestUploadConfigurationForADatabase();
}

main().catch(console.error);
