// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConfidentialLedgerClient } = require("@azure/arm-confidentialledger");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves the properties of all Confidential Ledgers.
 *
 * @summary retrieves the properties of all Confidential Ledgers.
 * x-ms-original-file: 2026-02-23/ConfidentialLedger_List.json
 */
async function confidentialLedgerList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000000-0000-0000-0000-000000000001";
  const client = new ConfidentialLedgerClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.ledger.listByResourceGroup("DummyResourceGroupName")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await confidentialLedgerList();
}

main().catch(console.error);
