// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConfidentialLedgerClient } = require("@azure/arm-confidentialledger");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an existing Confidential Ledger.
 *
 * @summary deletes an existing Confidential Ledger.
 * x-ms-original-file: 2026-02-23/ConfidentialLedger_Delete.json
 */
async function confidentialLedgerDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000000-0000-0000-0000-000000000001";
  const client = new ConfidentialLedgerClient(credential, subscriptionId);
  await client.ledger.delete("DummyResourceGroupName", "DummyLedgerName");
}

async function main() {
  await confidentialLedgerDelete();
}

main().catch(console.error);
