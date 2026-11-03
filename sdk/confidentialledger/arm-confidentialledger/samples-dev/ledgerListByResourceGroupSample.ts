// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfidentialLedgerClient } from "@azure/arm-confidentialledger";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves the properties of all Confidential Ledgers.
 *
 * @summary retrieves the properties of all Confidential Ledgers.
 * x-ms-original-file: 2026-02-23/ConfidentialLedger_List.json
 */
async function confidentialLedgerList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000000-0000-0000-0000-000000000001";
  const client = new ConfidentialLedgerClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.ledger.listByResourceGroup("DummyResourceGroupName")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await confidentialLedgerList();
}

main().catch(console.error);
