// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Restores a Confidential Ledger Resource.
 *
 * @summary Restores a Confidential Ledger Resource.
 * x-ms-original-file: specification/confidentialledger/resource-manager/Microsoft.ConfidentialLedger/preview/2024-09-19-preview/examples/ConfidentialLedger_Restore.json
 */

import type {
  ConfidentialLedgerRestore} from "@azure/arm-confidentialledger";
import {
  ConfidentialLedgerClient,
} from "@azure/arm-confidentialledger";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function confidentialLedgerRestore(): Promise<void> {
  const subscriptionId =
    process.env["CONFIDENTIALLEDGER_SUBSCRIPTION_ID"] ||
    "0000000-0000-0000-0000-000000000001";
  const resourceGroupName =
    process.env["CONFIDENTIALLEDGER_RESOURCE_GROUP"] ||
    "DummyResourceGroupName";
  const ledgerName = "DummyLedgerName";
  const confidentialLedger: ConfidentialLedgerRestore = {
    fileShareName: "DummyFileShareName",
    restoreRegion: "EastUS",
    uri: "DummySASUri",
  };
  const credential = new DefaultAzureCredential();
  const client = new ConfidentialLedgerClient(credential, subscriptionId);
  const result = await client.ledger.beginRestoreAndWait(
    resourceGroupName,
    ledgerName,
    confidentialLedger,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await confidentialLedgerRestore();
}

main().catch(console.error);
