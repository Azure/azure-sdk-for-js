// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfidentialLedgerClient } from "@azure/arm-confidentialledger";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to copies the ledger files and the service certificate to a customer's storage account of choice.
 *
 * @summary copies the ledger files and the service certificate to a customer's storage account of choice.
 * x-ms-original-file: 2026-02-23/ConfidentialLedger_FilesExport.json
 */
async function confidentialLedgerFilesExport(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000000-0000-0000-0000-000000000001";
  const client = new ConfidentialLedgerClient(credential, subscriptionId);
  const result = await client.ledger.filesExport("DummyResourceGroupName", "DummyLedgerName", {
    restoreRegion: "EastUS",
    uri: "DummySASUri",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await confidentialLedgerFilesExport();
}

main().catch(console.error);
