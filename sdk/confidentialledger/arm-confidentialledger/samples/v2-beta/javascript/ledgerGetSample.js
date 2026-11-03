// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConfidentialLedgerClient } = require("@azure/arm-confidentialledger");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves the properties of a Confidential Ledger.
 *
 * @summary retrieves the properties of a Confidential Ledger.
 * x-ms-original-file: 2026-02-23/ConfidentialLedger_Get.json
 */
async function confidentialLedgerGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000000-0000-0000-0000-000000000001";
  const client = new ConfidentialLedgerClient(credential, subscriptionId);
  const result = await client.ledger.get("DummyResourceGroupName", "DummyLedgerName");
  console.log(result);
}

async function main() {
  await confidentialLedgerGet();
}

main().catch(console.error);
