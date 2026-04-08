// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to disables uploading ledger digests to an Azure Storage account or an Azure Confidential Ledger instance.
 *
 * @summary disables uploading ledger digests to an Azure Storage account or an Azure Confidential Ledger instance.
 * x-ms-original-file: 2025-02-01-preview/ManagedLedgerDigestUploadsDisable.json
 */
async function disablesUploadingLedgerDigestsForADatabase(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.managedLedgerDigestUploads.disable(
    "ledgertestrg",
    "ledgertestserver",
    "testdb",
    "current",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await disablesUploadingLedgerDigestsForADatabase();
}

main().catch(console.error);
