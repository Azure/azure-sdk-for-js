// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfidentialLedgerClient } from "@azure/arm-confidentialledger";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves the properties of a Confidential Ledger.
 *
 * @summary retrieves the properties of a Confidential Ledger.
 * x-ms-original-file: 2026-02-23/ConfidentialLedger_Get.json
 */
async function confidentialLedgerGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000000-0000-0000-0000-000000000001";
  const client = new ConfidentialLedgerClient(credential, subscriptionId);
  const result = await client.ledger.get("DummyResourceGroupName", "DummyLedgerName");
  console.log(result);
}

async function main(): Promise<void> {
  await confidentialLedgerGet();
}

main().catch(console.error);
